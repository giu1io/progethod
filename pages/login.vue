<template>
  <div class="mt-10 ml-10">
    {{ $t('drag_this_bookmarklet') }}:
    <a class="m-5 p-3 bg-blue-300 rounded-lg" :href="bookmarkletCode">✨ Progethod</a>
    <div class="mt-10 flex flex-col items-center">
      <div class="mb-5">
        {{ $t('login_instructions') }}:
      </div>
      <video
        crossorigin
        playsinline
        autoplay
        muted
        loop
        width="958"
        height="628"
      >
        <source
          :src="instructionVideoUrl"
          type="video/mp4"
        >
      </video>
    </div>
  </div>
</template>

<script>
import bookmarkletCode from '~/utils/login.bookmarklet'

export default {
  async asyncData ({ $axios, store, query, redirect, env }) {
    if (!query.token) {
      return {
        bookmarkletCode,
        instructionVideoUrl: env.instructionVideoUrl
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
