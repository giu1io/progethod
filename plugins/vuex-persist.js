// eslint-disable-next-line import/no-named-as-default
import VuexPersistence from 'vuex-persist'
import { differenceInDays, parse } from 'date-fns'

export default ({ store }) => {
  new VuexPersistence({
    storage: window.localStorage,
    reducer ({ projects, entries, user, apiData }) {
      return {
        projects,
        entries: {
          entries: entries.entries
            .filter(e => differenceInDays(new Date(), parse(e.day, 'yyyy-MM-dd', new Date())) < 30)
        },
        user,
        apiData: {
          projects: apiData.projects,
          lastUpdatedAt: apiData.lastUpdatedAt
        }
      }
    }
  }).plugin(store)
}
