<template>
  <div>
    <div class="flex justify-between items-center my-2">
      <h2 class="capitalize text-xl font-bold leading-tight text-gray-800">
        {{ $dateFns.format(day, 'EEEE do') }}
      </h2>
      <location-input v-model="location" @input="handleLocationChange" />
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
    <div class="entries-table mb-4 mt-2">
      <div />
      <div class="entries-th">
        {{ $t('project') }}
      </div>
      <div class="entries-th">
        {{ $t('duration') }}
      </div>
      <div class="entries-th">
        {{ $t('notes') }}
      </div>
      <div />
      <div />
      <div />
      <div />
      <template v-for="entry in entries">
        <time-entry-item
          :key="`entry_${entry.id}`"
          :value="entry.data"
          @input="handleUpdateEvent(entry.id, $event)"
          @userSubmit="handleSubmit"
        />
        <button
          :key="`trash_${entry.id}`"
          class="ml-2 mr-2 hover:text-red-500 focus:text-red-500 p-2 border-transparent border focus:bg-gray-100 dark:focus:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded focus:outline-none"
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
        </button>
      </template>
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
    adjustmentWentWrong: false,
    location: 'home'
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
  mounted () {
    this.location = this.entries.reduce((acc, e) => {
      if (e.data.location && acc !== e.data.location) {
        acc = e.data.location
      }

      return acc
    }, this.location)
  },
  methods: {
    addEntry () {
      this.addEntryForDay({ day: this.dayId, data: { location: this.location } })
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
        .sort((a, b) => a.data.duration < b.data.duration ? 1 : -1)

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
    handleLocationChange (location) {
      this.entries
        .filter(e => e.data.location !== location)
        .forEach(({ id }) => this.updateLocationEntry({ id, location }))
    },
    ...mapActions({
      addEntryForDay: 'entries/add'
    }),
    ...mapMutations({
      removeEntry: 'entries/remove',
      updateEntry: 'entries/update',
      updateLocationEntry: 'entries/updateLocation',
      adjustEntry: 'entries/adjust',
      resetEntryAdjustment: 'entries/resetAdjustment'
    })
  }
}
</script>

<style lang="postcss">
  .entries-table {
    display: grid;
    grid-template-columns: [warn] 2rem [project] 14rem [duration] 4rem [notes] auto [decimal] 2rem [adjustment] 1.5rem [location] 5rem [delete] 3rem;
    grid-template-rows: auto;
    place-items: center;
    grid-gap: 0.5rem 0.5rem;
  }

  .entries-th {
    @apply w-full text-gray-800 text-sm font-bold leading-tight tracking-normal
  }
</style>
