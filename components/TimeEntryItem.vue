<template>
  <div class="flex mb-5">
    <tags-input
      v-model="selectedTags"
      :existing-tags="projects"
      id-field="id"
      text-field="name"
      :typeahead="true"
      typeahead-style="dropdown"
      :typeahead-hide-discard="true"
      :limit="1"
      :hide-input-on-limit="true"
      :placeholder="$t('select_project')"
      @tag-added="tagAdded"
    />
    <duration-input v-model="duration" :other="duration" />
    <div class="flex flex-col md:mr-16">
      <input id="notes" class="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow" placeholder="Notes">
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VoerroTagsInput from '@voerro/vue-tagsinput'
import DurationInput from './DurationInput'

export default {
  components: {
    DurationInput,
    TagsInput: VoerroTagsInput
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      duration: 0,
      selectedTags: []
    }
  },
  computed: {
    ...mapGetters({
      projects: 'projects/projects'
    })
  },
  methods: {
    async tagAdded (project) {
      if (!project.id) {
        project = await this.addProject(project.name)
        this.selectedTags = [project]
      }
    },
    ...mapActions({
      addProject: 'projects/add'
    })
  }
}
</script>

<style>

</style>
