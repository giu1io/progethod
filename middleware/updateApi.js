import { response } from '~/stub/serviceResponse'

function updateApiData (store) {
  store.commit('api_data/updateStarted')

  // ....
  const projects = response.data.projects.map(({ project, areas }) => ({
    id: project.id,
    name: project.name,
    is_automatic: project.project_type.is_timesheet_automatic,
    areas: areas.map(({ id, name }) => ({ id, name }))
  }))

  store.commit('api_data/replace', projects)
  store.commit('api_data/updateEnded')
}

export default function ({ store }) {
  if (!store.getters['api_data/isUpdating']) {
    updateApiData(store)
  }
}
