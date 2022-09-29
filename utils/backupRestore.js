import format from 'date-fns/format'

export function getBackupData (store) {
  const projects = store.getters['projects/projects']
  const entries = store.getters['entries/entries']

  return {
    projects,
    entries
  }
}

export function getBackupFile (data) {
  return new File([
    JSON.stringify(data, null, 2)
  ], `progethod_backup_${format(new Date(), 'yyyyMMdd_HHmm')}.json`)
}

export function triggerFileDownload (file) {
  // Create a link and set the URL using `createObjectURL`
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = URL.createObjectURL(file)
  link.download = file.name

  // It needs to be added to the DOM so it can be clicked
  document.body.appendChild(link)
  link.click()

  // To make this work on Firefox we need to wait
  // a little while before removing it.
  setTimeout(() => {
    URL.revokeObjectURL(link.href)
    link.parentNode.removeChild(link)
  }, 0)
}

export function askForBackupFile () {
  return new Promise((resolve, reject) => {
    // Create a link and set the URL using `createObjectURL`
    const input = document.createElement('input')
    input.style.display = 'none'
    input.type = 'file'
    input.accept = 'application/json'

    input.addEventListener('change', () => {
      if (input.files.length > 0) {
        resolve(input.files[0])
      } else {
        reject(new Error('This should never happen'))
      }

      cleanup()
    })

    // It needs to be added to the DOM so it can be clicked
    document.body.appendChild(input)
    input.click()

    const bodyFocusListener = () => setTimeout(() => {
      if (input.value.length === 0) {
        cleanup()
        resolve(null)
      }
    }, 500)

    const cleanup = () => {
      input.parentNode.removeChild(input)
      window.removeEventListener('focus', bodyFocusListener)
    }

    window.addEventListener('focus', bodyFocusListener)
  })
}

function readFile (file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => {
      resolve(fr.result)
    }
    fr.onerror = reject
    fr.readAsText(file)
  })
}

export async function restoreBackup (file, store) {
  try {
    const content = JSON.parse(await readFile(file))

    store.commit('projects/restoreBackup', content.projects)
    store.commit('entries/restoreBackup', content.entries)
  } catch (error) {
    console.error(error)
  }
}
