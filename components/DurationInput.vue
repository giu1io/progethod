<template>
  <div>
    <input
      ref="input"
      v-model="inputString"
      class="dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-16 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
      :class="{ 'text-gray-300': disabled, 'text-gray-600': !disabled }"
      type="text"
      maxlength="5"
      placeholder="00:00"
      :disabled="disabled"
      @input="handleUserInput"
      @blur="onBlur"
      @keyup.enter="enterKey"
    >
  </div>
</template>

<script>
import { minutesToHHmm } from '~/utils/duration'

export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputString: '',
      internalDuration: 0
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (newVal, oldVal) {
        if (this.internalDuration !== newVal) {
          this.internalDuration = newVal
          this.onBlur()
        }
      }
    }
  },
  methods: {
    parseUserInput () {
      if (this.inputString.length >= 3) {
        const matches = this.inputString.match(/([0-9]{1,2}):?([0-5][0-9])/)

        if (!matches || matches.length !== 3) {
          this.internalDuration = 0
          return
        }

        const hours = parseInt(matches[1])
        const minutes = parseInt(matches[2])

        this.internalDuration = hours * 60 + minutes
        return
      }

      const parsed = parseInt(this.inputString)

      if (isNaN(parsed)) {
        this.internalDuration = 0
        return
      }

      if (parsed < 10) {
        this.internalDuration = parsed * 60
        return
      }

      this.internalDuration = parsed
    },
    handleUserInput () {
      this.parseUserInput()
      this.$emit('input', this.internalDuration)
    },
    onBlur () {
      if (!this.internalDuration) {
        this.inputString = ''
        return
      }

      this.inputString = minutesToHHmm(this.internalDuration)
    },
    enterKey (event) {
      if (this.inputString) {
        this.$emit('userSubmit', event)
      }
    }
  }
}
</script>

<style>

</style>
