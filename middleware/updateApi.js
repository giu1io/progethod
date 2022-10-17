import { isSameDay, parseISO } from 'date-fns'
import { updateApiData } from '~/utils/updateApiData'

export default function ({ $axios, store }) {
  const lastUpdate = parseISO(store.getters['apiData/lastUpdatedAt'])

  if (
    !store.getters['apiData/isUpdating'] &&
    !isSameDay(lastUpdate, new Date()) &&
    store.getters['user/canMakeRequests']) {
    updateApiData($axios, store)
  }
}
