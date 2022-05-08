<template>
  <div class="flex">
    <tags-input
      ref="taginput"
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
      @tag-removed="tagRemoved"
    />
    <duration-input
      ref="duration"
      v-model="duration"
      @input="hasUpdated"
      @userSubmit="handleSubmit"
    />
    <div class="flex-col md:mr-16">
      <input
        ref="notes"
        v-model="notes"
        class="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
        placeholder="Notes"
        @input="hasUpdated"
        @keyup.enter="handleSubmit"
      >
    </div>
    <div class="flex-col md:mr-4">
      <input
        :value="value.decimal_duration"
        class="text-gray-600 disabled dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
        disabled
      >
    </div>
    <div class="flex-col md:mr-4">
      <input
        type="checkbox"
        :checked="value.requires_adjustment"
        disabled
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
    project () {
      return this.selectedTags.length === 1 ? this.selectedTags[0] : null
    },
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
  mounted () {
    if (!this.value.project) {
      this.$refs.taginput.$refs.taginput.focus()
    }
  },
  methods: {
    async tagAdded (project) {
      if (!project.id) {
        project = await this.addProject(project.name)
        this.selectedTags = [project]
      }
      if (this.hasUpdated()) {
        // focus next field
        this.$refs.duration.$refs.input.focus()
      }
    },
    tagRemoved () {
      // refocus after tag removed
      this.$refs.taginput.$refs.taginput.focus()
      this.hasUpdated()
    },
    hasUpdated () {
      if (!this.shouldEmitUpdate()) {
        return false
      }

      this.$emit('input', {
        project: this.selectedTags[0],
        duration: this.duration,
        notes: this.notes
      })
      return true
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
    handleSubmit (event) {
      // if the selected project require notes select the notes field
      if (this.project && this.project.requiresNotes && !this.notes) {
        this.$refs.notes.focus()
        return
      }

      this.$emit('userSubmit', event)
    },
    ...mapActions({
      addProject: 'projects/add'
    })
  }
}
</script>

<style>

</style>
