<template>
  <div class="mx-auto container py-10">
    <div class="flex items-center justify-between w-full">
      <div class="flex flex-col lg:flex-row w-full items-start lg:items-center rounded bg-white shadow">
        <div class="w-full lg:w-2/3 h-64 dark:bg-gray-800">
          <div class="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
            <div class="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
              <div class="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p class="text-lg text-gray-800 dark:text-gray-100 font-bold">
                  {{ $t('project_information') }}
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
                    <label for="name" class="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">{{ $t('project_name') }}</label>
                    <input
                      id="name"
                      v-model="name"
                      type="text"
                      name="name"
                      required
                      class="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400"
                      placeholder=""
                    >
                  </div>
                  <div>
                    <v-select v-model="linkedProject" label="name" :options="projects" @input="selectedProjectChanged" />
                  </div>
                  <div v-if="linkedProject">
                    <v-select v-model="linkedArea" label="name" :options="linkedProject.areas" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/3 h-24 dark:border-gray-700 lg:h-64 border-t lg:border-t-0 lg:border-r lg:border-l lg:rounded-r dark:bg-gray-700 bg-gray-100">
          <button class="m-5 transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm" @click="save">
            {{ $t('save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  InfoCircleIcon
} from 'vue-tabler-icons'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    InfoCircleIcon,
    vSelect
  },
  middleware: 'auth',
  asyncData ({ store, params: { id }, error }) {
    const cp = store.getters['projects/projects'].find(p => p.id === id)

    if (!cp) {
      error({ statusCode: 404, message: 'Project not found' })
    }

    let linkedProject, linkedArea
    if (cp.linkedProjectId) {
      linkedProject = store.getters['apiData/projects'].find(p => p.id === cp.linkedProjectId)
    }

    if (linkedProject && cp.linkedAreaId) {
      linkedArea = linkedProject.areas.find(a => a.id === cp.linkedAreaId)
    }

    return {
      id,
      name: cp.name,
      requiresNotes: cp.requiresNotes,
      linkedProject,
      linkedArea
    }
  },
  computed: {
    ...mapGetters({
      projects: 'apiData/projects'
    })
  },
  methods: {
    save () {
      this.updateProject({
        id: this.id,
        name: this.name,
        requiresNotes: this.requiresNotes,
        linkedProjectId: this.linkedProject?.id,
        linkedAreaId: this.linkedArea?.id
      })
      this.$router.back()
    },
    selectedProjectChanged () {
      this.linkedArea = null
    },
    ...mapMutations({
      updateProject: 'projects/update'
    })
  }
}
</script>

<style>

</style>
