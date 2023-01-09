import { format } from 'date-fns'

export async function updateApiData ($axios, store) {
  store.commit('apiData/updateStarted')

  try {
    const { data } = await $axios.$get('timetrackingboard', {
      params: {
        date: format(new Date(), 'yyyy-MM-dd')
      }
    })
    const projects = data.projects
      .filter(({ project }) => project.archived !== true)
      .map(({ project, areas }) => ({
        id: project.id,
        name: project.name,
        isAutomatic: project.project_type.is_timesheet_automatic,
        areas: areas
          .filter(({ on }) => on)
          .map(({ id, name }) => ({ id, name }))
      }))

    store.commit('apiData/replace', projects)
  } catch (error) {
    console.error(error)
  }

  store.commit('apiData/updateEnded')

  updateOrphanedProjects(store)
}

function updateOrphanedProjects () {

}
