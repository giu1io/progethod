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
        <div class="flex justify-between items-center">
          <div class="">
            <label for="toggleConfirmRequired" class="text-sm font-bold text-gray-800 dark:text-gray-100 mr-5">{{ $t('require_confirm_on_submit') }}</label>
          </div>
          <div class="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
            <input
              id="toggleConfirmRequired"
              :checked="isConfirmOnSubmitRequired"
              type="checkbox"
              class="focus:outline-none checkbox w-6 h-6 rounded-full bg-indigo-700 dark:bg-gray-400 absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto"
              @input="setRequireSubmitConfirmation($event.target.checked)"
            >
            <label for="toggleConfirmRequired" class="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
    <!-- Page title ends -->
    <div class="container mx-auto px-6">
      <!-- Remove class [ h-64 ] when adding a card block -->
      <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border -->
      <div v-for="day of days" :key="day.toString()" class="w-full rounded border-dashed border-2 border-gray-300 mb-10">
        <!-- Place your content here -->
        <day-input-item :day="day" />
      </div>
    </div>
  </div>
</template>

<script>
import { PaperclipIcon } from 'vue-tabler-icons'
import { mapGetters, mapMutations } from 'vuex'
import DayInputItem from '~/components/DayInputItem'

export default {
  components: {
    PaperclipIcon,
    DayInputItem
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
      modal: false
    }
  },
  computed: {
    ...mapGetters({
      isTokenExpired: 'user/isTokenExpired',
      isConfirmOnSubmitRequired: 'preferences/isConfirmOnSubmitRequired'
    })
  },
  methods: {
    ...mapMutations({
      setRequireSubmitConfirmation: 'preferences/setRequireSubmitConfirmation'
    })
  }
}
</script>

<style lang="postcss">

</style>
