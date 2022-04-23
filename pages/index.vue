<template>
  <div>
    <!-- Page title starts -->

    <div class="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
      <div>
        <h4 class="text-2xl font-bold leading-tight text-gray-800">
          User Profile
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
        <button class="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">
          Back
        </button>
        <button class="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm">
          Edit Profile
        </button>
      </div>
    </div>
    <!-- Page title ends -->
    <div class="container mx-auto px-6">
      <!-- Remove class [ h-64 ] when adding a card block -->
      <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border -->
      <div v-for="day of days" :key="day.toString()" class="w-full h-64 rounded border-dashed border-2 border-gray-300">
        <!-- Place your content here -->
        <day-input-item :day="day" />
      </div>
    </div>
  </div>
</template>

<script>
import { PaperclipIcon } from 'vue-tabler-icons'
import DayInputItem from '~/components/DayInputItem'

export default {
  name: 'LightWithGreyBackground',
  components: {
    PaperclipIcon,
    DayInputItem
  },
  data ({ $dateFns }) {
    const days = []

    for (let i = 0; i < 7; i++) {
      days.push($dateFns.addDays($dateFns.startOfWeek(new Date(), { weekStartsOn: 1 }), i))
    }

    return {
      days,
      xmlns: 'http://www.w3.org/2000/svg',
      xlink: 'http://www.w3.org/1999/xlink',
      profilePhoto: 'https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png'
    }
  },
  methods: {
    dropdownHandler (event) {
      const single = event.currentTarget.getElementsByTagName('ul')[0]
      single.classList.toggle('hidden')
    },
    MenuHandler (el, val) {
      const MainList = el.currentTarget.parentElement.getElementsByTagName('ul')[0]
      const closeIcon = el.currentTarget.parentElement.getElementsByClassName('close-m-menu')[0]
      const showIcon = el.currentTarget.parentElement.getElementsByClassName('show-m-menu')[0]
      if (val) {
        MainList.classList.remove('hidden')
        el.currentTarget.classList.add('hidden')
        closeIcon.classList.remove('hidden')
      } else {
        showIcon.classList.remove('hidden')
        MainList.classList.add('hidden')
        el.currentTarget.classList.add('hidden')
      }
    }
  }
}
</script>

<style lang="postcss">
  .navbar > .nuxt-link-exact-active {
      @apply border-b-2;
      @apply border-indigo-700;
      @apply text-indigo-700;
  }
</style>
