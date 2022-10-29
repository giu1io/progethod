<template>
  <div>
    <!-- Page title starts -->

    <alert v-if="isTokenExpired" :message="$t('session_expired')" level="warning" />
    <div class="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
      <div>
        <h4 class="text-2xl font-bold leading-tight text-gray-800">
          {{ $t('my_week') }}
        </h4>
        <ul class="flex flex-col md:flex-row items-start md:items-center text-gray-600 text-sm mt-3">
          <li class="flex items-center mr-3 mt-3 md:mt-0">
            <span class="mr-2">
              <paperclip-icon
                width="16"
                height="16"
                viewBox="0 0 24 24"
                stroke-width="1.5"
              />
            </span>
            <span>Active</span>
          </li>
          <li class="flex items-center mr-3 mt-3 md:mt-0">
            <span class="mr-2">
              <svg
                :xmlns="xmlns"
                class="icon icon-tabler icon-tabler-trending-up"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <polyline points="3 17 9 11 13 15 21 7" />
                <polyline points="14 7 21 7 21 14" />
              </svg>
            </span>
            <span>Trending</span>
          </li>
          <li class="flex items-center mt-3 md:mt-0">
            <span class="mr-2">
              <svg
                :xmlns="xmlns"
                class="icon icon-tabler icon-tabler-plane-departure"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M15 12h5a2 2 0 0 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3z" transform="rotate(-15 12 12) translate(0 -1)" />
                <line x1="3" y1="21" x2="21" y2="21" />
              </svg>
            </span>
            <span>Started on 29 Jan 2020</span>
          </li>
        </ul>
      </div>
      <div class="mt-6 lg:mt-0">
        <!-- <button class="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">
          Back
        </button> -->
        <button
          class="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm"
          @click="submit()"
        >
          {{ $t('submit_weekly_timesheet') }}
        </button>
      </div>
    </div>
    <!-- Page title ends -->
    <div class="container mx-auto px-6">
      <!-- Remove class [ h-64 ] when adding a card block -->
      <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border -->
      <div v-for="day of days" :key="day.toString()" class="w-full rounded border-2 border-gray-300 mb-5 p-2">
        <!-- Place your content here -->
        <day-input-item :day="day" />
      </div>
    </div>
    <submit-timesheet-modal v-model="modal" :timesheet-data="timesheetData" />
  </div>
</template>

<script>
import { PaperclipIcon } from 'vue-tabler-icons'
import { mapGetters } from 'vuex'
import DayInputItem from '~/components/DayInputItem'
import SubmitTimesheetModal from '~/components/SubmitTimesheetModal'
import { prepareForSubmission } from '~/utils/timesheetMapper'

export default {
  components: {
    PaperclipIcon,
    DayInputItem,
    SubmitTimesheetModal
  },
  middleware: 'auth',
  data ({ $dateFns }) {
    const days = []

    for (let i = 0; i < 7; i++) {
      // days.push($dateFns.addDays($dateFns.startOfWeek($dateFns.addDays(new Date(), 7), { weekStartsOn: 1 }), i))
      days.push($dateFns.addDays($dateFns.startOfWeek(new Date(), { weekStartsOn: 1 }), i))
    }

    return {
      days,
      xmlns: 'http://www.w3.org/2000/svg',
      modal: false,
      timesheetData: null
    }
  },
  computed: {
    ...mapGetters({
      isTokenExpired: 'user/isTokenExpired'
    })
  },
  methods: {
    submit () {
      const dayEntries = this.days.map((day) => {
        const dayStr = this.$dateFns.format(day, 'yyyy-MM-dd')
        return {
          day: dayStr,
          entries: this.$store.getters['entries/entries']
            .filter(e => e.day === dayStr)
        }
      })

      const userProjects = this.$store.getters['projects/projects']
      const linkedProjects = this.$store.getters['apiData/projects']
      const employeeId = this.$store.getters['user/info'].employee_id

      // TODO error handling if linkedProject/linkedArea not found
      try {
        this.timesheetData = prepareForSubmission(dayEntries, userProjects, linkedProjects, employeeId)
        this.modal = true
      } catch (error) {
        console.error(error)
        alert(this.$t(error.message))
      }
    }
  }
}
</script>

<style lang="postcss">

</style>
