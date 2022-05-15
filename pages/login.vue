<template>
  <div class="mt-10 ml-10">
    Drag This Bookmarklet:
    <a class="m-5 p-3 bg-blue-300 rounded-lg" :href="bookmarkletCode">✨ Progethod</a>
  </div>
</template>

<script>
import bookmarkletCode from '~/utils/login.bookmarklet'

export default {
  async asyncData ({ $axios, store, query, redirect }) {
    if (!query.token) {
      return {
        bookmarkletCode
      }
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
