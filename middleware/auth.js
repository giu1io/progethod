export default function ({ store, redirect, localeLocation }) {
  if (!store.getters['user/authToken']) {
    redirect(localeLocation({ name: 'login' }))
  }
}
