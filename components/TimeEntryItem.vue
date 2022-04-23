<template>
  <div class="flex">
    <tags-input
      v-model="selectedTags"
      class="mb-5"
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
      @tag-removed="hasUpdated"
    />
    <duration-input v-model="duration" @input="hasUpdated" />
    <div class="flex-col md:mr-16">
      <input
        v-model="notes"
        class="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
        placeholder="Notes"
        @input="hasUpdated"
      >
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
      selectedTags: [],
      notes: ''
    }
  },
  computed: {
    ...mapGetters({
      projects: 'projects/projects'
    })
  },
  watch: {
    value: {
      immediate: true,
      handler (newData, oldData) {
        this.selectedTags = newData.project ? [this.projects.find(p => p.id === newData.project.id)] : []
        this.duration = newData.duration
        this.notes = newData.notes
      }
    }
  },
  methods: {
    async tagAdded (project) {
      if (!project.id) {
        project = await this.addProject(project.name)
        this.selectedTags = [project]
      }
      this.hasUpdated()
    },
    hasUpdated () {
      if (this.shouldEmitUpdate()) {
        this.$emit('input', {
          project: this.selectedTags[0],
          duration: this.duration,
          notes: this.notes
        })
      }
    },
    shouldEmitUpdate () {
      // only emit update if one of the input has changed
      if (this.value.duration !== this.duration) {
        return true
      }

      if (this.value.notes !== this.notes) {
        return true
      }

      if (
        (!this.selectedTags.length && this.value.project) ||
        (this.selectedTags.length && !this.value.project) ||
        (this.selectedTags.length && this.value.project && this.selectedTags[0].id !== this.value.project.id)
      ) {
        return true
      }

      return false
    },
    ...mapActions({
      addProject: 'projects/add'
    })
  }
}
</script>

<style>

</style>
