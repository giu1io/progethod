<template>
  <div
    id="modal"
    class="py-12 dark:bg-black bg-gray-700 transition-opacity z-10 absolute top-0 right-0 bottom-0 left-0"
    :class="{'opacity-0': !value, 'pointer-events-none': !value, 'opacity-100': value}"
  >
    <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-xl flex justify-center">
      <div class="relative w-11/12 sm:w-8/12 md:w-9/12 bg-white dark:bg-gray-800 shadow pt-10 pb-8 rounded">
        <div class="flex flex-col items-center px-4 md:px-8">
          <img src="https://i.ibb.co/QDMrqK5/Saly-10.png">
          <p class="text-base sm:text-lg md:text-2xl font-bold md:leading-6 mt-6 text-gray-800 text-center dark:text-gray-100">
            {{ $t('about_to_submit_timesheet') }}
          </p>
          <p class="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 text-center text-gray-600 dark:text-gray-300">
            {{ $t('submit_timesheet_warning') }}
          </p>
          <div>
            <div class="w-full my-2 h-12 transition-opacity opacity-0" :class="{ 'opacity-100': isSubmitting && !isExpired }">
              <div class="flex justify-between items-center pb-2 flex-col">
                <p class="text-xs text-indigo-700 font-bold">
                  {{ sentPercentage }}% {{ $t('sent') }}
                </p>
                <p class="text-xs font-bold text-gray-800">
                  {{ $t('please_wait_sending') }}
                </p>
              </div>
              <div class="flex items-center">
                <div class="w-full bg-gray-200 h-1 mr-1 rounded-tl rounded-bl relative">
                  <div class="h-1 bg-indigo-700 transition-transform w-full origin-left" :style="{ transform: `scaleX(${sentPercentage / 100})` }" />
                </div>
              </div>
            </div>
          </div>
          <alert v-if="isExpired" class="w-full" level="error" :message="$t('session_expired')" />
          <div v-if="!isExpired" class="flex items-center justify-center mt-4 sm:mt-6 w-full">
            <button
              v-if="!isSubmitting"
              class="px-6 py-2 bg-indigo-700 dark:bg-indigo-600 focus:outline-none hover:bg-opacity-80 mx-2 my-2 rounded"
              @click="submit()"
            >
              <send-icon width="20" height="20" class="text-white" />
            </button>
            <button
              v-if="isSubmitting"
              class="mx-2 my-2 bg-gray-100 rounded border border-gray-300 text-gray-600 px-6 py-2 text-xs cursor-default"
            >
              <send-icon width="20" height="20" class="text-gray-600" />
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
import pLimit from 'p-limit'
import { mapGetters } from 'vuex'

const limit = pLimit(5)

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
  data () {
    return {
      isSubmitting: false,
      sentData: 0
    }
  },
  computed: {
    dataToSend () {
      return this.timesheetData || []
    },
    sentPercentage () {
      const total = this.timesheetData?.length || 0
      return Math.floor((this.sentData * 100 / total) || 0)
    },
    ...mapGetters({
      isExpired: 'user/isTokenExpired'
    })
  },
  methods: {
    dismiss () {
      this.$emit('input', false)
    },
    async submit () {
      this.isSubmitting = true
      this.sentData = 0

      // TODO Error handling
      await Promise.all(
        this.dataToSend.map(
          entry => limit(
            () => this.$axios.post('timetracking', entry)
              .then(() => this.sentData++)
          )
        )
      )

      this.dismiss()
      this.isSubmitting = false
    }
  }
}
</script>

<style>
.checkbox:checked + .check-icon {
  display: flex;
}
</style>
