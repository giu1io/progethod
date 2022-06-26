
<template>
  <div class="mx-auto container py-10">
    <div class="flex items-center justify-between w-full">
      <div class="flex flex-col lg:flex-row w-full items-start lg:items-center rounded bg-white shadow">
        <div class="w-full lg:w-2/3 h-64 dark:bg-gray-800">
          <div class="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
            <alert v-if="isError" level="error" :message="$t('something_went_wrong')" />
            <div class="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
              <div class="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p class="text-lg text-gray-800 dark:text-gray-100 font-bold">
                  {{ $t('connect_your_jira_account') }}
                </p>
                <div class="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                  <info-circle-icon width="16" height="16" />
                </div>
              </div>
            </div>
            <div class="mx-auto pt-4">
              <div class="container mx-auto">
                <form class="my-6 w-11/12 mx-auto xl:w-full xl:mx-0">
                  <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                    <label for="name" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">{{ $t('email') }}</label>
                    <input
                      id="email"
                      v-model="email"
                      type="text"
                      name="name"
                      required
                      class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                      placeholder=""
                    >
                  </div>
                  <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                    <label for="name" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">{{ $t('jira_api_key') }}</label>
                    <input
                      id="apiKey"
                      v-model="apiKey"
                      type="text"
                      name="apiKey"
                      required
                      class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                      placeholder=""
                    >
                  </div>
                  <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6" />
                </form>
              </div>
            </div>
            <div class="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
              <div class="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p class="text-lg text-gray-800 dark:text-gray-100 font-bold">
                  {{ $t('connected_jira_account_info') }}
                </p>
                <div class="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                  <info-circle-icon width="16" height="16" />
                </div>
              </div>
            </div>
            <div class="mx-auto pt-4">
              <div class="container mx-auto">
                <form class="my-6 w-11/12 mx-auto xl:w-full xl:mx-0">
                  <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                    <label for="accountId" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">{{ $t('account_id') }}</label>
                    <span>{{ info.accountId }}</span>
                  </div>
                  <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                    <label for="displayName" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">{{ $t('account_name') }}</label>
                    <span>{{ info.displayName }}</span>
                  </div>
                  <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/3 h-24 dark:border-gray-700 lg:h-64 border-t lg:border-t-0 lg:border-r lg:border-l lg:rounded-r dark:bg-gray-700 bg-gray-100">
          <button class="m-5 transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm" @click="connect">
            {{ $t('connect') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InfoCircleIcon } from 'vue-tabler-icons'
import { mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    InfoCircleIcon
  },
  middleware: 'auth',
  data () {
    const { email, apiKey } = this.$store.getters['jira/credentials']
    return {
      apiKey,
      email,
      isError: false
    }
  },
  computed: {
    ...mapGetters({
      info: 'jira/info'
    })
  },
  methods: {
    async connect () {
      this.isError = false

      try {
        const { data } = await this.$jira.get('me', {
          auth: {
            username: this.email,
            password: this.apiKey
          }
        })
        this.updateCredentials({
          email: this.email,
          apiKey: this.apiKey
        })
        this.updateInfo(data)

        const { data: projects } = await this.$jira.get('projects')
        this.updateProjects(projects.map(({ key, name, id }) => ({ key, name, id })))
      } catch (e) {
        console.error(e)
        this.isError = true
      }
    },
    ...mapMutations({
      updateCredentials: 'jira/setCredentials',
      updateInfo: 'jira/updateInfo',
      updateProjects: 'jira/setProjects'
    })
  }
}
</script>

<style>

</style>
