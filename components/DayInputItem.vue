<template>
  <div>
    <div class="flex justify-between">
      <h2 class="capitalize text-xl font-bold leading-tight text-gray-800">
        {{ $dateFns.format(day, 'EEEE do') }}
      </h2>
      <div class="text-xl font-bold">
        I: {{ printableDuration.hours }}h {{ printableDuration.minutes }}m
      </div>
      <div class="text-xl font-bold">
        W: {{ printableDecimalDuration.hours }}h {{ printableDecimalDuration.minutes }}m
      </div>
    </div>
    <div>
      <alert v-if="totalNotAdjustable" :message="$t('errors.total_not_adjustable')" level="error" />
      <alert v-if="adjustmentWentWrong" :message="$t('errors.error_during_adjustment')" level="error" />
    </div>
    <div class="flex my-2">
      <label class="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2 w-64">Project</label>
      <label class="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2">Time</label>
    </div>
    <div v-for="entry in entries" :key="entry.id">
      <div class="flex">
        <time-entry-item
          :value="entry.data"
          @input="handleUpdateEvent(entry.id, $event)"
          @userSubmit="handleSubmit"
        />
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
import Alert from '~/components/Alert'
import { getPrintableDuration } from '~/utils/duration'

const dayDuration = 60 * 8

export default {
  components: {
    TimeEntryItem,
    TrashIcon,
    PlusIcon,
    Alert
  },
  props: {
    day: {
      required: true,
      type: Date
    }
  },
  data: () => ({
    adjustmentWentWrong: false
  }),
  computed: {
    dayId () {
      return this.$dateFns.format(this.day, 'yyyy-MM-dd')
    },
    entries () {
      return this.$store.getters['entries/entries'].filter(e => e.day === this.dayId)
    },
    totalDuration () {
      return this.entries.reduce((sum, e) => sum + (e.data.duration || 0), 0)
    },
    totalDecimalDuration () {
      return this.entries.reduce((sum, e) => sum + (e.data.decimal_duration || 0), 0)
    },
    totalNotAdjustable () {
      return this.totalDuration >= dayDuration && this.totalDuration % 60
    },
    printableDuration () {
      return getPrintableDuration(this.totalDuration)
    },
    printableDecimalDuration () {
      return getPrintableDuration(this.totalDecimalDuration * 60)
    }
  },
  methods: {
    addEntry () {
      this.addEntryForDay({ day: this.dayId, data: {} })
    },
    removeEntry (id) {
      this.removeEntry(id)

      this.adjustDecimals()
    },
    handleUpdateEvent (id, data) {
      this.updateEntry({ id, data })

      this.adjustDecimals()
    },
    handleSubmit () {
      this.addEntry()
    },
    adjustDecimals () {
      const totalDuration = this.totalDuration

      // if duration is less than day don't try to perform adjustment
      if (totalDuration < dayDuration) {
        return
      }

      // if duration is not / 60 don't try to adjust
      if (totalDuration % 60) {
        return
      }

      // reset all adjustments
      this.entries.forEach(entry => this.resetEntryAdjustment(entry.id))

      const provisionalDecimalDuration = this.entries.reduce((sum, e) => sum + e.data.decimal_duration, 0)
      let totalAdjustmentsRequired = ((totalDuration / 60) * 10 - (provisionalDecimalDuration * 10)) / 10
      const adjustableEntries = this.entries
        .filter(e => e.data.requires_adjustment)
        .sort((a, b) => a.data.duration > b.data.duration ? 1 : -1)

      const adjustment = 0.1

      let entry = true
      while (totalAdjustmentsRequired > 0 && entry) {
        entry = adjustableEntries.find(e => !e.data.adjusted)
        this.adjustEntry({ id: entry.id, adjustment })

        totalAdjustmentsRequired = (totalAdjustmentsRequired * 10 - adjustment * 10) / 10
      }

      if (this.totalDecimalDuration * 60 !== totalDuration) {
        this.adjustmentWentWrong = true
      } else {
        this.adjustmentWentWrong = false
      }
    },
    ...mapActions({
      addEntryForDay: 'entries/add'
    }),
    ...mapMutations({
      removeEntry: 'entries/remove',
      updateEntry: 'entries/update',
      adjustEntry: 'entries/adjust',
      resetEntryAdjustment: 'entries/resetAdjustment'
    })
  }
}
</script>

<style>

</style>
