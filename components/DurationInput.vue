<template>
  <div>
    <input
      v-model="inputString"
      type="text"
      maxlength="5"
      placeholder="00:00"
      @input="handleUserInput"
      @blur="onBlur"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
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
        const matches = this.inputString.match(/([0-9]{1,2}):?([0-9]{2})/)

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

      const pad = n => n.toString().padStart(2, '0')
      const minutes = this.internalDuration % 60
      const hours = Math.floor(this.internalDuration / 60)

      this.inputString = `${pad(hours)}:${pad(minutes)}`
    }
  }
}
</script>

<style>

</style>
