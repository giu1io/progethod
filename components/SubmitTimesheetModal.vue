<template>
  <modal :value="value" @input="emitChange">
    <img src="https://i.ibb.co/QDMrqK5/Saly-10.png">
    <p class="text-base sm:text-lg md:text-2xl font-bold md:leading-6 mt-6 text-gray-800 text-center dark:text-gray-100">
      {{ $t('about_to_submit_timesheet') }}
    </p>
    <p class="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 text-center text-gray-600 dark:text-gray-300">
      {{ $t('submit_timesheet_warning') }}
    </p>
    <div>
      <div class="w-full my-2 h-12 transition-opacity opacity-0" :class="{ 'opacity-100': isSubmitting && !isExpired }">
        <progress-bar :fill="sentPercentage" />
      </div>
    </div>
    <alert v-if="isExpired" class="w-full" level="error" :message="$t('session_expired')" />
    <alert v-if="isError" class="w-full" level="error" :message="errorMessage" />
    <div v-if="!isExpired && !isError && isConfirmOnSubmitRequired" class="flex items-center justify-center mt-4 sm:mt-6 w-full">
      <button
        :disabled="isSubmitting"
        class="px-6 py-2 bg-indigo-700 disabled:bg-gray-500 text-white disabled:text-gray-600 disabled:cursor-default dark:bg-indigo-600 focus:outline-none hover:bg-opacity-80 mx-2 my-2 rounded"
        @click="submit()"
      >
        <send-icon width="20" height="20" />
      </button>
    </div>
  </modal>
</template>

<script>
import { SendIcon } from 'vue-tabler-icons'
import pLimit from 'p-limit'
import { mapGetters, mapMutations } from 'vuex'

const limit = pLimit(5)

export default {
  components: {
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
      isError: false,
      errorMessage: '',
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
      isExpired: 'user/isTokenExpired',
      isConfirmOnSubmitRequired: 'preferences/isConfirmOnSubmitRequired'
    })
  },
  watch: {
    value: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal && newVal === true && !this.isExpired && !this.isConfirmOnSubmitRequired) {
          this.$nextTick(() => this.submit())
        }
      }
    }
  },
  methods: {
    emitChange (value) {
      this.$emit('input', value)
    },
    async submit () {
      this.isSubmitting = true
      this.sentData = 0

      // TODO Error handling
      await Promise.all(
        this.dataToSend.map(
          entry => limit(
            async () => {
              const { internalIds, debugProjectName, ...requestData } = entry

              let data = {}

              try {
                const response = await this.$axios.post('timetracking', requestData)
                data = response.data
              } catch (err) {
                console.error(err)
                data = {
                  code: err.response?.status || 500,
                  message: err.message
                }
              }

              if (data.code !== 200) {
                this.isSubmitting = false
                this.isError = true
                this.errorMessage = this.$t('errors.unexpected_status_code', {
                  code: data.code || '',
                  message: data.message || '',
                  project: debugProjectName
                })
                throw new Error(this.errorMessage)
              }

              // await new Promise(resolve => setTimeout(() => resolve(requestData), 2000))
              this.sentData++
              internalIds.forEach(id => this.syncEntry({ id, synced: true }))
            }
          )
        )
      )

      this.emitChange(false)
      this.isSubmitting = false
    },
    ...mapMutations({
      syncEntry: 'entries/setSyncState'
    })
  }
}
</script>

<style>
</style>
