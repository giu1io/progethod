import { minutesToHHmm } from './duration'

export function prepareForSubmission (dayEntries, userProjects, linkedProjects, employeeId) {
  return dayEntries
    .map(({ entries, day }) => ({ day, projects: mergeEntries(entries, userProjects, linkedProjects) }))
    .map(({ day, projects }) => {
      return Object.keys(projects).map((projectId) => {
        const project = projects[projectId]
        const internalIds = Object.values(project)
          .map(area => area.internal_ids)
          .reduce((acc, ids) => acc.concat(ids), [])
        return {
          project_id: parseInt(projectId),
          employee_id: employeeId,
          date: day,
          hours: Object.keys(project).map(areaId => ({
            area_id: areaId === 'null' ? null : parseInt(areaId),
            types: {
              internal: project[areaId].decimal_duration.internal || null,
              remote: project[areaId].decimal_duration.remote || null,
              travel: null,
              overtime: null,
              night_shift: null
            },
            // eslint-disable-next-line quotes
            notes: project[areaId].notes.join("\n")
          })),
          internalIds
        }
      })
    })
    .reduce((acc, day) => acc.concat(day), [])
}

function mergeEntries (entries, userProjects, linkedProjects) {
  const projects = {}

  entries
    .filter(({ data }) => data.duration > 0)
    .forEach(({ id, data }) => {
      const { linkedProjectId, linkedAreaId = 'null' } = userProjects.find(p => p.id === data.project?.id) || {}
      if (!linkedProjectId) {
        throw new Error('errors.linked_project_not_found')
      }

      const linkedProject = linkedProjects.find(p => p.id === linkedProjectId)

      if (!linkedProject) {
        throw new Error('errors.linked_project_not_found')
      }

      if (linkedProject.isAutomatic) {
        return
      }

      if (!projects[linkedProjectId]) {
        projects[linkedProjectId] = {}
      }

      const project = projects[linkedProjectId]

      if (!project[linkedAreaId]) {
        project[linkedAreaId] = {
          decimal_duration: {
            internal: 0,
            remote: 0
          },
          notes: [],
          internal_ids: []
        }
      }

      const area = project[linkedAreaId]

      switch (data.location) {
        case 'office':
          area.decimal_duration.internal = decimalAdd(area.decimal_duration.internal, data.decimal_duration)
          break
        case 'home':
        default:
          area.decimal_duration.remote = decimalAdd(area.decimal_duration.remote, data.decimal_duration)
      }

      area.notes.push(`- ${data.notes || '%'} *${minutesToHHmm(data.duration)}* #${id}`)
      area.internal_ids.push(id)
    })

  return projects
}

function decimalAdd (n1, n2) {
  return ((n1 * 10) + (n2 * 10)) / 10
}

export function prepareForCleanup (projects, employeeId) {
  const getCleanArea = (areaId) => {
    return {
      area_id: areaId,
      types: {
        internal: null,
        remote: null,
        travel: null,
        overtime: null,
        night_shift: null
      }
    }
  }

  // find all the stuff that needs to be deleted
  return projects
    .map((p) => {
      const hours = []

      p.areas.forEach((a) => {
        if (a.notes) {
          hours.push(getCleanArea(a.id))
          return
        }

        if (Object.values(a.hours).some(v => v !== null)) {
          hours.push(getCleanArea(a.id))
        }
      })

      return {
        project_id: p.id,
        date: p.date,
        employee_id: employeeId,
        hours
      }
    })
    .filter(p => p.hours.length > 0)
}
