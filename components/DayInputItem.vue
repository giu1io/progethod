<template>
  <div>
    <h1 class="capitalize">
      {{ $dateFns.format(day, 'EEEE do') }}
    </h1>
    <div class="flex my-2">
      <label class="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2 w-64">Project</label>
      <label class="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2">Time</label>
    </div>
    <div v-for="entry in entries" :key="entry.id">
      <div class="flex">
        <time-entry-item :value="entry.data" @input="handleUpdateEvent(entry.id, $event)" />
        <a
          class="text-red-500 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
          @click="removeEntry(entry.id)"
        >
          <trash-icon
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </a>
      </div>
    </div>
    <div
      class="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-8 h-8 rounded flex items-center justify-center"
      @click="addEntry"
    >
      <plus-icon
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </div>
  </div>
</template>

<script>
import { TrashIcon, PlusIcon } from 'vue-tabler-icons'
import { mapActions, mapMutations } from 'vuex'
import TimeEntryItem from '~/components/TimeEntryItem'

export default {
  components: {
    TimeEntryItem,
    TrashIcon,
    PlusIcon
  },
  props: {
    day: {
      required: true,
      type: Date
    }
  },
  computed: {
    dayId () {
      return this.$dateFns.format(this.day, 'yyyy-MM-dd')
    },
    entries () {
      return this.$store.getters['entries/entries'].filter(e => e.day === this.dayId)
    }
  },
  methods: {
    addEntry () {
      this.addEntryForDay({ day: this.dayId, data: {} })
    },
    removeEntry (id) {
      this.removeEntry(id)
    },
    handleUpdateEvent (id, data) {
      this.updateEntry({ id, data })
    },
    ...mapActions({
      addEntryForDay: 'entries/add'
    }),
    ...mapMutations({
      removeEntry: 'entries/remove',
      updateEntry: 'entries/update'
    })
  }
}
</script>

<style>

</style>
