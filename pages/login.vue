<template>
  <div class="m-10 pt-20">
    <ul>
      <li>
        {{ $t("login_tutorial.step_1") }}<a class="underline" target="_blank" :href="'https://' + loginHost">{{ $t("login_tutorial.step_1_cta") }}</a>
      </li>
      <li>
        {{ $t("login_tutorial.step_2") }}
      </li>
      <li>
        {{ $t("login_tutorial.step_3") }}
      </li>
      <li v-html="$t('login_tutorial.step_4', {loginHost: loginHost})" />
      <li v-html="$t('login_tutorial.step_5')" />
    </ul>
    <img class="mt-5" src="~/assets/how_to_cookie.png">
    <div class="mt-5 bg-white p-10">
      <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
        <label for="name" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Cookie:</label>
        <input
          id="authCookie"
          v-model="authCookie"
          type="text"
          name="name"
          required
          class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
          placeholder="incolla il cookie qui"
        >
      </div>
      <button
        :disabled="!authCookie"
        class="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm disabled:bg-gray-500 text-white disabled:text-gray-600 disabled:cursor-default"
        @click="submitCookie()"
      >
        Login
      </button>
    </div>
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
      loginHost: env.loginHost,
      authCookie: null
    }
  },
  methods: {
    async submitCookie () {
      const { data } = await this.$axios.$get('me', {
        headers: {
          'x-sf-sess-id': this.authCookie
        }
      })

      this.setToken(this.authCookie)
      this.updateInfo(data)

      return this.$router.push('/')
    },
    ...mapMutations({
      setToken: 'user/setToken',
      updateInfo: 'user/updateInfo'
    })
  }
}
</script>

<style>

</style>
