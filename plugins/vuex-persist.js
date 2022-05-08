// eslint-disable-next-line import/no-named-as-default
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    storage: window.localStorage,
    reducer ({ projects, entries, user, apiData }) {
      return {
        projects,
        entries,
        user,
        apiData: {
          projects: apiData.projects,
          lastUpdatedAt: apiData.lastUpdatedAt
        }
      }
    }
  }).plugin(store)
}
