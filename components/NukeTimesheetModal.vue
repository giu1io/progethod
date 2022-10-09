<template>
  <modal :value="value" @input="emitChange">
    <video
      ref="explosion"
      playsinline
      muted
      loop
      preload="none"
      poster="~/assets/explosion_poster.jpg"
      width="668"
      height="500"
    >
      <source
        src="~/assets/explosion.mp4"
        type="video/mp4"
      >
    </video>
    <p class="text-base sm:text-lg md:text-2xl font-bold md:leading-6 mt-6 text-gray-800 text-center dark:text-gray-100">
      {{ $t('about_to_nuke_timesheet') }}
    </p>
    <p class="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 text-center text-gray-600 dark:text-gray-300">
      {{ $t('nuke_timesheet_warning') }}
    </p>
    <div>
      <div class="w-full my-2 h-12 transition-opacity opacity-0" :class="{ 'opacity-100': isSubmitting && !isExpired }">
        <progress-bar :fill="sentPercentage" />
      </div>
    </div>
    <alert v-if="isExpired" class="w-full" level="error" :message="$t('session_expired')" />
    <div v-if="!isExpired" class="flex items-center justify-center mt-4 sm:mt-6 w-full">
      <button
        v-if="!isSubmitting"
        class="px-6 py-2 bg-red-500 dark:bg-red-600 focus:outline-none hover:bg-opacity-80 mx-2 my-2 rounded"
        @click="submit()"
      >
        <rocket-icon width="20" height="20" class="text-white" />
      </button>
      <button
        v-if="isSubmitting"
        class="mx-2 my-2 bg-gray-100 rounded border border-gray-300 text-gray-600 px-6 py-2 text-xs cursor-default"
      >
        <rocket-icon width="20" height="20" class="text-gray-600" />
      </button>
    </div>
  </modal>
</template>

<script>
import { RocketIcon } from 'vue-tabler-icons'
import pLimit from 'p-limit'
import { mapGetters, mapMutations } from 'vuex'
import { prepareForCleanup } from '~/utils/timesheetMapper'

const limit = pLimit(5)

export default {
  components: {
    RocketIcon
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    dayEntries: {
      type: Array,
      default: () => []
    },
    day: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isSubmitting: false,
      sentData: 0,
      dataToSend: []
    }
  },
  computed: {
    sentPercentage () {
      const total = this.dataToSend?.length || 0
      return Math.floor((this.sentData * 100 / total) || 0)
    },
    ...mapGetters({
      isExpired: 'user/isTokenExpired'
    })
  },
  methods: {
    emitChange (value) {
      this.$emit('input', value)
    },
    async submit () {
      this.$refs.explosion.play()
      const employeeId = this.$store.getters['user/info'].employee_id
      this.isSubmitting = true
      this.sentData = 0

      const { data } = await this.$axios.$get('timetrackingboard', {
        params: {
          date: this.day
        }
      })

      this.dataToSend = prepareForCleanup(data.projects, employeeId)

      // TODO Error handling
      await Promise.all(
        this.dataToSend.map(
          entry => limit(
            async () => {
              await this.$axios.post('timetracking', entry)
              this.sentData++
            }
          )
        )
      )

      this.dayEntries.forEach(({ id }) => this.syncEntry({ id, synced: false }))

      this.emitChange(false)
      this.isSubmitting = false
      this.$refs.explosion.pause()
      this.$refs.explosion.currentTime = 0
    },
    ...mapMutations({
      syncEntry: 'entries/setSyncState'
    })
  }
}
</script>

<style>
</style>
