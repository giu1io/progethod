<template>
  <div
    id="modal"
    class="py-12 dark:bg-black bg-gray-700 transition-opacity z-10 absolute top-0 right-0 bottom-0 left-0"
    :class="{'opacity-0': !value, 'pointer-events-none': !value, 'opacity-100': value}"
  >
    <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg flex justify-center">
      <div class="relative w-11/12 sm:w-8/12 md:w-9/12 bg-white dark:bg-gray-800 shadow pt-10 pb-8 rounded">
        <div class="flex flex-col items-center px-4 md:px-12">
          <img src="https://i.ibb.co/QDMrqK5/Saly-10.png">
          <p class="text-base sm:text-lg md:text-2xl font-bold md:leading-6 mt-6 text-gray-800 text-center dark:text-gray-100">
            {{ $t('about_to_submit_timesheet') }}
          </p>
          <p class="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 text-center text-gray-600 dark:text-gray-300">
            {{ $t('submit_timesheet_warning') }}
          </p>
          <div class="flex items-center justify-center mt-4 sm:mt-6 w-full">
            <button class="px-3 py-3 bg-indigo-700 dark:bg-indigo-600 focus:outline-none hover:bg-opacity-80 ml-2 rounded" @click="submit()">
              <send-icon width="20" height="20" class="text-white" />
            </button>
          </div>
        </div>
        <div class="cursor-pointer absolute top-0 right-0 m-3 text-gray-800 dark:text-gray-100 transition duration-150 ease-in-out" @click="dismiss()">
          <x-icon
            class="icon icon-tabler icon-tabler-x"
            width="20"
            height="20"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XIcon, SendIcon } from 'vue-tabler-icons'

export default {
  components: {
    XIcon,
    SendIcon
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    timesheetData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    dataToSend () {
      return this.timesheetData || []
    }
  },
  methods: {
    dismiss () {
      this.$emit('input', false)
    },
    async submit () {
      const dataToSend = this.dataToSend

      while (dataToSend.length > 0) {
        const batch = dataToSend.splice(0, 5)
        // TODO Error handling
        await Promise.all(batch.map(entry => this.$axios.post('timetracking', entry)))
      }

      this.dismiss()
    }
  }
}
</script>

<style>
.checkbox:checked + .check-icon {
  display: flex;
}
</style>
