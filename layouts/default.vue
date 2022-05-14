<template>
  <div class="bg-gray-200 w-full h-full min-h-screen">
    <!-- Navigation starts -->
    <nav class="w-full mx-auto bg-white shadow">
      <div class="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
        <div class="h-full flex items-center">
          <div class="mr-10 flex items-center">
            <img
              id="logo"
              aria-label="Home"
              enable-background="new 0 0 300 300"
              height="44"
              viewBox="0 0 300 300"
              width="43"
              src="/icon.png"
            >
            <h3 class="text-base text-gray-800 font-bold tracking-normal leading-tight ml-3 hidden lg:block">
              Progethod
            </h3>
          </div>

          <ul class="pr-12 xl:flex items-center h-full hidden navbar">
            <NuxtLink to="/" class="h-full flex items-center">
              <li class="hover:text-indigo-700 cursor-pointer h-full flex items-center text-sm tracking-normal mx-5">
                Timesheet
              </li>
            </NuxtLink>
            <NuxtLink to="/projects" class="h-full flex items-center">
              <li class="hover:text-indigo-700 cursor-pointer h-full flex items-center text-sm tracking-normal mx-5">
                {{ $t('projects') }}
              </li>
            </NuxtLink>
          </ul>
        </div>

        <div class="h-full xl:flex items-center justify-end hidden">
          <div class="w-full h-full flex items-center">
            <div class="w-full pr-12 h-full flex items-center border-r">
              <div class="relative w-full">
                <div class="text-gray-500 absolute ml-3 inset-0 m-auto w-4 h-4">
                  <search-icon
                    class="icon icon-tabler icon-tabler-search"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </div>
                <input class="border border-gray-100 focus:outline-none focus:border-indigo-700 w-56 rounded text-sm text-gray-500 bg-gray-100 pl-8 py-2" type="text" placeholder="Search">
              </div>
            </div>
            <div class="w-full h-full flex">
              <div class="w-32 h-full flex items-center justify-center border-r cursor-pointer text-gray-600">
                <bell-icon
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
              <div aria-haspopup="true" class="cursor-pointer w-full flex items-center justify-end relative" @click="dropdownHandler($event)">
                <ul class="p-2 w-40 border-r bg-white absolute rounded z-40 left-0 shadow mt-64 hidden">
                  <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                    <div class="flex items-center">
                      <user-icon
                        class="icon icon-tabler icon-tabler-user"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <span class="ml-2"> My Profile </span>
                    </div>
                  </li>
                  <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
                    <help-icon
                      class="icon icon-tabler icon-tabler-help"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <span class="ml-2">Help Center</span>
                  </li>
                  <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                    <settings-icon
                      class="icon icon-tabler icon-tabler-settings"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <span class="ml-2">Account Settings</span>
                  </li>
                </ul>
                <img class="rounded h-10 w-10 object-cover" :src="userInfo.pic" alt="logo">
                <p class="text-gray-800 text-sm ml-2">
                  {{ `${userInfo.name} ${userInfo.surname}` }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="visible xl:hidden flex items-center">
          <ul class="z-40 p-2 border-r bg-white absolute rounded top-0 left-0 right-0 shadow mt-16 md:mt-16 hidden">
            <li class="flex xl:hidden cursor-pointer text-gray-600 text-base leading-3 tracking-normal mt-2 py-3 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <div class="flex items-center">
                <span class="leading-6 ml-2 font-bold"> Dashboard </span>
              </div>
            </li>
            <li class="xl:hidden flex-col cursor-pointer text-gray-600 text-base leading-3 tracking-normal py-3 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center" @click="dropdownHandler($event)">
              <div class="flex items-center">
                <span class="leading-6 ml-2 font-bold"> Products </span>
              </div>
              <ul class="ml-2 mt-3 hidden">
                <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                  Landing Pages
                </li>
                <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                  Templates
                </li>
                <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                  Components
                </li>
              </ul>
            </li>
            <li class="xl:hidden cursor-pointer text-gray-600 text-base leading-3 tracking-normal py-3 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
              <span class="leading-6 ml-2 font-bold">Performance</span>
            </li>
            <li class="xl:hidden flex-col cursor-pointer text-gray-600 text-base leading-3 tracking-normal mb-2 py-3 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center" @click="dropdownHandler($event)">
              <div class="flex items-center">
                <span class="leading-6 ml-2 font-bold"> Deliverables </span>
              </div>
              <ul class="ml-2 mt-3 hidden">
                <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                  Landing Pages
                </li>
                <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                  Templates
                </li>
                <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                  Components
                </li>
              </ul>
            </li>
            <li>
              <hr class="border-b border-gray-300 w-full">
            </li>
            <li class="ml-2 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
              <div class="flex items-center">
                <div class="w-12 cursor-pointer flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out">
                  <img class="rounded h-10 w-10 object-cover" :src="userInfo.pic" alt="logo">
                </div>
                <p class="leading-6 text-base ml-1 cursor-pointer">
                  Jane Doe
                </p>
                <div class="sm:ml-2 text-white relative">
                  <chevron-down-icon
                    class="icon icon-tabler icon-tabler-chevron-down cursor-pointer"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </div>
              </div>
            </li>
            <li class="ml-2 cursor-pointer text-gray-600 text-base leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <div class="flex items-center">
                <user-icon
                  class="icon icon-tabler icon-tabler-user"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <span class="leading-6 ml-2">Profile</span>
              </div>
            </li>
          </ul>

          <menu-icon
            aria-haspopup="true"
            aria-label="Main Menu"
            class="show-m-menu icon icon-tabler icon-tabler-menu"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            @click="MenuHandler($event, true)"
          />
          <div class="hidden close-m-menu" @click="MenuHandler($event, false)">
            <svg
              aria-label="Close"
              :xmlns="xmlns"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
    <!-- Navigation ends -->
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  BellIcon,
  ChevronDownIcon,
  HelpIcon,
  MenuIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon
} from 'vue-tabler-icons'

export default {
  components: {
    BellIcon,
    ChevronDownIcon,
    HelpIcon,
    MenuIcon,
    SearchIcon,
    SettingsIcon,
    UserIcon
  },
  data () {
    return {
      xmlns: 'http://www.w3.org/2000/svg',
      xlink: 'http://www.w3.org/1999/xlink',
      profilePhoto: 'https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png'
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/info'
    })
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
