<template>
  <div class="contents">
    <div class="warning-container w-8 h-8 flex justify-center items-center ">
      <NuxtLink
        v-if="project"
        :to="localeLocation({ name: 'projects-id', params: { id: project.id } })"
      >
        <alert-triangle-icon v-if="!isProjectLinked" class="text-yellow-500" />
        <external-link-icon v-if="isProjectLinked" class="text-gray-400" />
      </NuxtLink>
    </div>
    <div class="w-full h-full">
      <tags-input
        ref="taginput"
        v-model="selectedTags"
        class="w-full h-full"
        :existing-tags="projects"
        id-field="id"
        text-field="name"
        :typeahead="true"
        typeahead-style="dropdown"
        :typeahead-hide-discard="true"
        :limit="1"
        :hide-input-on-limit="true"
        :placeholder="$t('select_project')"
        :disabled="disabled"
        @tag-added="tagAdded"
        @tag-removed="tagRemoved"
      />
    </div>
    <div>
      <duration-input
        ref="duration"
        v-model="duration"
        :disabled="disabled"
        @input="hasUpdated"
        @userSubmit="handleSubmit"
      />
    </div>
    <div class="w-full">
      <input
        ref="notes"
        v-model="notes"
        class="dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
        :class="{ 'text-gray-300': disabled, 'text-gray-600': !disabled }"
        placeholder="Notes"
        :disabled="disabled"
        @input="hasUpdated"
        @keyup.enter="handleSubmit"
      >
    </div>
    <div>
      <span
        class="text-gray-600"
      >
        {{ value.decimal_duration }}
      </span>
    </div>
    <div class="flex justify-center items-center" :title="$t('requires_adjustment')">
      <adjustments-horizontal-icon v-if="value.requires_adjustment" class="text-gray-300" />
    </div>
    <div class="flex justify-center items-center" :title="$t('work_location')">
      <location-input v-model="location" :disabled="disabled" @input="hasUpdated" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VoerroTagsInput from '@voerro/vue-tagsinput'
import { AlertTriangleIcon, ExternalLinkIcon, AdjustmentsHorizontalIcon } from 'vue-tabler-icons'
import DurationInput from './DurationInput'
import LocationInput from './LocationInput'

export default {
  components: {
    DurationInput,
    TagsInput: VoerroTagsInput,
    AlertTriangleIcon,
    ExternalLinkIcon,
    AdjustmentsHorizontalIcon,
    LocationInput
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      duration: 0,
      selectedTags: [],
      notes: '',
      location: 'home'
    }
  },
  computed: {
    project () {
      return this.selectedTags.length === 1 ? this.selectedTags[0] : null
    },
    isProjectLinked () {
      return this.project && this.project.linkedProjectId
    },
    ...mapGetters({
      projects: 'projects/projects'
    })
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (newData, oldData) {
        this.selectedTags = newData.project ? [this.projects.find(p => p.id === newData.project.id)] : []
        this.duration = newData.duration
        this.notes = newData.notes
        this.location = newData.location || 'home'
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

      if (project.defaultNotes && !this.notes) {
        this.notes = project.defaultNotes
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
        // keep other value that may be in the payload
        ...this.value,
        project: this.selectedTags[0],
        duration: this.duration,
        notes: this.notes,
        location: this.location
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

      if (this.value.location !== this.location) {
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
