<template>
  <div>
    Drag This Bookmarklet
    <a :href="bookmarkletCode">Progethod</a>
  </div>
</template>

<script>
import bookmarkletCode from '~/utils/login.bookmarklet'

export default {
  async asyncData ({ $axios, store, query, redirect }) {
    const pageData = {
      bookmarkletCode
    }

    if (!query.token) {
      return pageData
    }

    const { data } = await $axios.$get('me', {
      headers: {
        'x-sf-sess-id': query.token
      }
    })

    store.commit('user/setToken', query.token)
    store.commit('user/updateInfo', data)

    return redirect('/')
  }
}
</script>

<style>

</style>
