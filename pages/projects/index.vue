<template>
  <div class="w-full bg-gray-200 py-10">
    <div class="mx-auto container bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded">
      <div class="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
        <div class="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
          <div class="flex items-center">
            <a class="text-gray-600 dark:text-gray-400 p-2 border-transparent border bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
              <edit-icon
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
            <a class="text-gray-600 dark:text-gray-400 mx-2 p-2 border-transparent border bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
              <settings-icon
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
            <a class="text-gray-600 dark:text-gray-400 mr-2 p-2 border-transparent border bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
              <bookmark-icon
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
            <a class="text-gray-600 dark:text-gray-400 mr-2 p-2 border-transparent border bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
              <copy-icon
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
            <a class="text-red-500 p-2 border-transparent border bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray" href="javascript: void(0)">
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
        <div class="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
          <div class="flex items-center lg:border-l lg:border-r border-gray-300 py-3 lg:py-0 lg:px-6">
            <p id="page-view" class="text-base text-gray-600 dark:text-gray-400">
              Viewing 1 - 20 of 60
            </p>
            <a class="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded" @click="pageView(false)">
              <chevron-left-icon
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
            <a class="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer" @click="pageView(true)">
              <chevron-right-icon
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
          <div class="flex items-center lg:border-r border-gray-300 pb-3 lg:pb-0 lg:px-6">
            <div class="relative w-32 z-10">
              <div class="pointer-events-none text-gray-600 dark:text-gray-400 absolute inset-0 m-auto mr-2 xl:mr-4 z-0 w-5 h-5">
                <chevron-down-icon
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

              <select aria-label="Selected tab" class="focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray text-base form-select block w-full py-2 px-2 xl:px-3 rounded text-gray-600 dark:text-gray-400 appearance-none bg-transparent">
                <option>List View</option>
                <option>Grid View</option>
              </select>
            </div>
          </div>

          <div class="lg:ml-6 flex items-center">
            <button class="bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm">
              Download All
            </button>
            <div class="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-8 h-8 rounded flex items-center justify-center">
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
        </div>
      </div>
      <div class="w-full">
        <table class="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr class="w-full h-16 border-gray-300 border-b py-8">
              <th class="pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                <input type="checkbox" class="cursor-pointer relative w-5 h-5 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" @click="checkAll">
              </th>
              <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                <div class="text-gray-600 dark:text-gray-400 opacity-0 cursor-default relative w-10">
                  <div class="absolute top-0 right-0 w-5 h-5 mr-2 -mt-1 rounded-full bg-indigo-700 text-white flex justify-center items-center text-xs">
                    3
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-file"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  </svg>
                </div>
              </th>
              <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                Invoice Number
              </th>
              <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                Client
              </th>
              <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                Company Contact
              </th>
              <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                Amount
              </th>
              <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                Date
              </th>
              <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                <div class="opacity-0 w-2 h-2 rounded-full bg-indigo-400" />
              </th>
              <td class="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">
                More
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id" class="h-24 border-gray-300 border-b">
              <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                <input type="checkbox" class="cursor-pointer relative w-5 h-5 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" @click="tableInteract">
              </td>
              <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                <div class="relative w-10 text-gray-600 dark:text-gray-400">
                  <div class="absolute top-0 right-0 w-5 h-5 mr-2 -mt-1 rounded-full bg-indigo-700 text-white flex justify-center items-center text-xs">
                    {{ project.files }}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-file"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  </svg>
                </div>
              </td>
              <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                {{ project.invoice_number }}
              </td>
              <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                {{ project.client }}
              </td>
              <td class="pr-6 whitespace-no-wrap">
                <div class="flex items-center">
                  <div class="h-8 w-8">
                    <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/advance_tables/at_1.png" alt="" class="h-full w-full rounded-full overflow-hidden shadow">
                  </div>
                  <p class="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">
                    {{ project.contact }}
                  </p>
                </div>
              </td>
              <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                {{ project.amount }}
              </td>
              <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                {{ project.date }}
              </td>
              <td class="pr-6">
                <div class="w-2 h-2 rounded-full" :class="`bg-${project.color}-400`" />
              </td>
              <td class="pr-8 relative">
                <div
                  :ref="`project_dp_${project.id}`"
                  class="dropdown-content mt-8 absolute left-0 -ml-12 shadow-md z-10 w-32"
                  :class="{'hidden': !showDropDown[project.id]}"
                  tabindex="0"
                  @focusout="dismissDropdown(project)"
                >
                  <ul class="bg-white dark:bg-gray-800 shadow rounded py-1">
                    <li
                      class="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal"
                      @click="edit(project.id)"
                    >
                      Edit
                    </li>
                    <li class="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                      Delete
                    </li>
                    <li class="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                      Duplicate
                    </li>
                  </ul>
                </div>
                <button
                  class="text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none"
                  @click="showDropdown(project)"
                >
                  <dots-vertical-icon
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  EditIcon,
  SettingsIcon,
  BookmarkIcon,
  CopyIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon
} from 'vue-tabler-icons'

export default {
  name: 'CompactTableWithActionsAndSelect',
  components: {
    EditIcon,
    SettingsIcon,
    BookmarkIcon,
    CopyIcon,
    TrashIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    PlusIcon,
    DotsVerticalIcon
  },
  middleware: 'auth',
  data () {
    return {
      temp: 0,
      showDropDown: {}
    }
  },
  computed: {
    projects () {
      return this.$store.getters['projects/projects'].map(p => ({
        id: p.id,
        files: 4,
        invoice_number: '#MC10023',
        client: p.name,
        contact: 'Carrie Anthony',
        amount: '$2,500',
        date: '02.03.20',
        color: 'red'
      }))
    }
  },
  methods: {
    edit (id) {
      this.$router.push(this.localeLocation({ name: 'projects-id', params: { id } }))
    },
    dismissDropdown (project) {
      this.$set(this.showDropDown, project.id, false)
    },
    showDropdown (project) {
      this.$set(this.showDropDown, project.id, true)
      this.$nextTick(() => this.$refs[`project_dp_${project.id}`][0].focus())
    },
    dropdownFunction (event) {
      const dropdowns = document.getElementsByClassName('dropdown-content')
      let i
      const list = event.currentTarget.parentElement.parentElement.getElementsByClassName('dropdown-content')[0]
      for (i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.add('hidden')
      }
      list.classList.toggle('hidden')
    },
    documentClick (event) {
      if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName('dropdown-content')
        let i
        for (i = 0; i < dropdowns.length; i++) {
          const openDropdown = dropdowns[i]
          openDropdown.classList.add('hidden')
        }
      }
    },
    checkAll (event) {
      const rows = event.currentTarget.parentElement.parentElement.parentElement.nextElementSibling.children
      for (let i = 0; i < rows.length; i++) {
        if (event.currentTarget.checked) {
          rows[i].classList.add('bg-gray-100')
          const checkbox = rows[i].getElementsByTagName('input')[0]
          if (checkbox) {
            checkbox.checked = true
          }
        } else {
          rows[i].classList.remove('bg-gray-100')
          const checkbox = rows[i].getElementsByTagName('input')[0]
          if (checkbox) {
            checkbox.checked = false
          }
        }
      }
    },
    tableInteract (event) {
      const single = event.currentTarget.parentElement.parentElement
      single.classList.toggle('bg-gray-100')
    },
    pageView (val) {
      const text = document.getElementById('page-view')
      if (val) {
        if (this.$data.temp === 2) {
          this.$data.temp = 0
        } else {
          this.$data.temp = this.$data.temp + 1
        }
      } else if (this.$data.temp !== 0) {
        this.$data.temp = this.$data.temp - 1
      }
      switch (this.$data.temp) {
        case 0:
          text.innerHTML = 'Viewing 1 - 20 of 60'
          break
        case 1:
          text.innerHTML = 'Viewing 21 - 40 of 60'
          break
        case 2:
          text.innerHTML = 'Viewing 41 - 60 of 60'
      }
    }
  }
}
</script>
