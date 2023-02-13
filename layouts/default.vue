<template>
  <div class="bg-gray-200 w-full h-full min-h-screen">
    <!-- Navigation starts -->
    <nav class="w-full mx-auto bg-white shadow fixed top-0 z-10">
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
              src="/progethod.svg"
            >
            <h3 class="text-base text-gray-800 font-bold tracking-normal leading-tight ml-3 hidden lg:block">
              Progethod
            </h3>
          </div>

          <ul class="pr-12 xl:flex items-center h-full hidden navbar">
            <NuxtLink to="/" class="h-full flex items-center">
              <li class="hover:text-indigo-700 cursor-pointer h-full flex items-center text-sm tracking-normal mx-5 capitalize">
                {{ $t('timesheet') }}
              </li>
            </NuxtLink>
            <NuxtLink to="/projects" class="h-full flex items-center">
              <li class="hover:text-indigo-700 cursor-pointer h-full flex items-center text-sm tracking-normal mx-5 capitalize">
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
                <loader-icon
                  v-if="isUpdating"
                  width="28"
                  height="28"
                  class="animate-spin"
                />
                <circle-check-icon
                  v-if="!isUpdating && !isTokenExpired"
                  width="28"
                  height="28"
                  class="text-green-500"
                  stroke-width="1.5"
                />
                <circle-x-icon
                  v-if="!isUpdating && isTokenExpired"
                  width="28"
                  height="28"
                  class="text-red-500"
                  stroke-width="1.5"
                />
              </div>
              <div aria-haspopup="true" class="w-full flex items-center justify-end relative" @click="dropdownHandler($event)">
                <ul class="p-2 w-40 border-r bg-white absolute rounded z-40 left-0 shadow mt-64 hidden">
                  <li class="text-gray-200 text-sm leading-3 tracking-normal py-2 focus:outline-none">
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
                  <li class="text-gray-200 text-sm leading-3 tracking-normal mt-2 py-2 focus:outline-none flex items-center">
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
                  <li class="text-gray-200 text-sm leading-3 tracking-normal mt-2 py-2 flex items-center focus:outline-none">
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
                  <li
                    class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                    @click="backup()"
                  >
                    <database-export-icon
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
                    <span class="ml-2">{{ $t('backup') }}</span>
                  </li>
                  <li
                    class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                    @click="restore()"
                  >
                    <database-import-icon
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
                    <span class="ml-2">{{ $t('restore') }}</span>
                  </li>
                  <li
                    class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                    @click="updateProjects()"
                  >
                    <refresh-icon
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
                    <span class="ml-2">{{ $t('update_projects') }}</span>
                  </li>
                </ul>
                <img class="rounded h-10 w-10 object-cover cursor-pointer" :src="userInfo.pic || profilePhoto" alt="logo">
                <p class="text-gray-800 text-sm ml-2 cursor-pointer">
                  {{ `${userInfo.name} ${userInfo.surname}` }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="visible xl:hidden flex items-center">
          <ul class="z-40 p-2 border-r bg-white absolute rounded top-0 left-0 right-0 shadow mt-16 md:mt-16 hidden">
            <NuxtLink to="/" class="h-full flex items-center">
              <li class="flex xl:hidden cursor-pointer text-gray-600 text-base leading-3 tracking-normal mt-2 py-3 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none capitalize">
                <div class="flex items-center">
                  <span class="leading-6 ml-2 font-bold"> {{ $t('timesheet') }} </span>
                </div>
              </li>
            </NuxtLink>
            <NuxtLink to="/projects" class="h-full flex items-center">
              <li class="flex xl:hidden cursor-pointer text-gray-600 text-base leading-3 tracking-normal mt-2 py-3 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none capitalize">
                <div class="flex items-center">
                  <span class="leading-6 ml-2 font-bold"> {{ $t('projects') }} </span>
                </div>
              </li>
            </NuxtLink>
            <li>
              <hr class="border-b border-gray-300 w-full">
            </li>
            <li class="ml-2 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
              <div class="flex items-center">
                <div class="w-12 cursor-pointer flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out">
                  <img class="rounded h-10 w-10 object-cover" :src="userInfo.pic || profilePhoto" alt="logo">
                </div>
                <p class="leading-6 text-base ml-1 cursor-pointer">
                  {{ `${userInfo.name} ${userInfo.surname}` }}
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
            <li class="ml-2 text-gray-200 text-base leading-3 tracking-normal py-2 focus:outline-none">
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
            <li
              class="ml-2 cursor-pointer text-gray-600 text-base leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none"
              @click="backup()"
            >
              <div class="flex items-center">
                <database-export-icon
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
                <span class="leading-6 ml-2">{{ $t('backup') }}</span>
              </div>
            </li>
            <li
              class="ml-2 cursor-pointer text-gray-600 text-base leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none"
              @click="restore()"
            >
              <div class="flex items-center">
                <database-import-icon
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
                <span class="leading-6 ml-2">{{ $t('restore') }}</span>
              </div>
            </li>
            <li
              class="ml-2 cursor-pointer text-gray-600 text-base leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none"
              @click="updateProjects()"
            >
              <div class="flex items-center">
                <refresh-icon
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
                <span class="leading-6 ml-2">{{ $t('update_projects') }}</span>
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
  ChevronDownIcon,
  CircleCheckIcon,
  CircleXIcon,
  DatabaseExportIcon,
  DatabaseImportIcon,
  HelpIcon,
  MenuIcon,
  LoaderIcon,
  RefreshIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon
} from 'vue-tabler-icons'
import { getBackupData, getBackupFile, triggerFileDownload, askForBackupFile, restoreBackup } from '~/utils/backupRestore'
import { updateApiData } from '~/utils/updateApiData'

export default {
  components: {
    ChevronDownIcon,
    CircleCheckIcon,
    CircleXIcon,
    DatabaseExportIcon,
    DatabaseImportIcon,
    HelpIcon,
    LoaderIcon,
    MenuIcon,
    RefreshIcon,
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
      userInfo: 'user/info',
      isUpdating: 'apiData/isUpdating',
      isTokenExpired: 'user/isTokenExpired'
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
    },
    backup () {
      triggerFileDownload(getBackupFile(getBackupData(this.$store)))
    },
    async restore () {
      const backupFile = await askForBackupFile()
      if (backupFile) {
        await restoreBackup(backupFile, this.$store)
      }
    },
    async updateProjects () {
      await updateApiData(this.$axios, this.$store)
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

  body {
    @apply bg-gray-200;
  }
</style>
