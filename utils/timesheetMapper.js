import { minutesToHHmm } from './duration'

export function prepareForSubmission (dayEntries, userProjects, employeeId) {
  return dayEntries
    .map(({ entries, day }) => ({ day, projects: mergeEntries(entries, userProjects) }))
    .map(({ day, projects }) => {
      return Object.keys(projects).map((projectId) => {
        const project = projects[projectId]
        return {
          project_id: parseInt(projectId),
          employee_id: employeeId,
          date: day,
          hours: Object.keys(project).map(areaId => ({
            area_id: parseInt(areaId),
            types: {
              internal: null,
              remote: project[areaId].decimal_duration,
              travel: null,
              overtime: null,
              night_shift: null
            },
            // eslint-disable-next-line quotes
            notes: project[areaId].notes.join("\n")
          }))
        }
      })
    })
    .reduce((acc, day) => acc.concat(day), [])
}

function mergeEntries (entries, userProjects) {
  const projects = {}

  entries.forEach(({ id, data }) => {
    const { linkedProjectId, linkedAreaId } = userProjects.find(p => p.id === data.project.id)

    // TODO error handling if linkedProject/linkedArea not found

    if (!projects[linkedProjectId]) {
      projects[linkedProjectId] = {}
    }

    const project = projects[linkedProjectId]

    if (!project[linkedAreaId]) {
      project[linkedAreaId] = {
        decimal_duration: 0,
        notes: []
      }
    }

    const area = project[linkedAreaId]

    area.decimal_duration = ((area.decimal_duration * 10) + (data.decimal_duration * 10)) / 10
    area.notes.push(`- ${data.notes || '%'} *${minutesToHHmm(data.duration)}* #${id}`)
  })

  return projects
}
