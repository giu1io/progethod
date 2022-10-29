import { startOfDay, endOfDay, differenceInMinutes, parseISO } from 'date-fns'

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'

function connectCalendar () {
  const tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: process.env.gCalClientId,
    scope: SCOPES,
    callback: '' // defined later
  })

  const authorizedPromise = new Promise((resolve, reject) => {
    tokenClient.callback = (tokenResponse) => {
      if (tokenResponse.error !== undefined) {
        return reject(tokenResponse)
      }

      window.$nuxt.$store.commit('user/authorizedGoogleToken', tokenResponse.expires_in)

      resolve()
    }
  })

  tokenClient.requestAccessToken({ prompt: '' })

  return authorizedPromise
}

export async function getEvents (day) {
  // ensure apiClient is loaded
  await gApiLoadPromise()

  if (!window.$nuxt.$store.getters['user/isGoogleTokenValid']) {
    // ensure calendar is authorized and connected
    await connectCalendar()
  }

  const request = {
    calendarId: 'primary',
    timeMin: startOfDay(day).toISOString(),
    timeMax: endOfDay(day).toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime'
  }
  const response = await window.gapi.client.calendar.events.list(request)

  const events = response.result.items

  if (!events || events.length === 0) {
    return []
  }

  return events
}

// load event on gApi is called only once
let loadedPromise = null

function gApiLoadPromise () {
  if (!loadedPromise) {
    loadedPromise = new Promise((resolve) => {
      window.gapi.load('client', async () => {
        await window.gapi.client.init({
          apiKey: process.env.gCalApiKey,
          discoveryDocs: [DISCOVERY_DOC]
        })

        resolve()
      })
    })
  }
  return loadedPromise
}

export function mapEventsToTimesheetEntries (events, currentEntries) {
  return events
    .filter(event => !currentEntries.find(e => e.data.gCalId === event.id))
    .map(event => ({
      duration: differenceInMinutes(parseISO(event.end.dateTime), parseISO(event.start.dateTime)),
      project: null,
      notes: event.summary,
      gCalId: event.id
    }))
}
