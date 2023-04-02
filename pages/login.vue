<template>
  <div class="m-10 pt-20">
    <ul>
      <li>
        {{ $t("login_tutorial.step_1") }}<a class="underline" target="_blank" :href="loginExtensionUrl">{{ $t("login_tutorial.step_1_cta") }}</a>
      </li>
      <li>
        {{ $t("login_tutorial.step_2") }}
      </li>
      <li>
        {{ $t("login_tutorial.step_3") }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  async asyncData ({ $axios, store, query, redirect, env }) {
    if (query.token) {
      const { data } = await $axios.$get('me', {
        headers: {
          'x-sf-sess-id': query.token
        }
      })

      store.commit('user/setToken', query.token)
      store.commit('user/updateInfo', data)

      return redirect('/')
    }

    return {
      instructionVideoUrl: env.instructionVideoUrl,
      loginExtensionUrl: env.loginExtensionUrl,
      authCookie: null
    }
  },
  methods: {
    ...mapMutations({
      setToken: 'user/setToken',
      updateInfo: 'user/updateInfo'
    })
  }
}
</script>

<style>

</style>
