<template>
  <div class="flex items-center justify-center px-4 sm:px-0">
    <div id="alert" class="lg:w-10/12 transition duration-150 ease-in-out shadow rounded-md md:flex justify-between items-center top-0 mt-4 mb-4 py-4 px-4" :class="`bg-${color}-200`">
      <div class="sm:flex items-center">
        <div class="flex items-end">
          <alert-circle-icon class="mr-2 mt-0.5 sm:mt-0" :class="`text-${color}-500`" />
          <p class="mr-2 text-base font-bold" :class="`text-${color}-500`">
            {{ $t(level) }}
          </p>
        </div>
        <div class="h-1 w-1 rounded-full mr-2 hidden xl:block" :class="`bg-${color}-500`" />
        <p class="text-base" :class="`text-${color}-500`" v-html="message" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  AlertCircleIcon
} from 'vue-tabler-icons'

export default {
  name: 'ColorCodedWithIconWarning',
  components: {
    AlertCircleIcon
  },
  props: {
    message: {
      type: String,
      required: true
    },
    level: {
      type: String,
      default: 'warning'
    }
  },
  computed: {
    color () {
      return this.level === 'error' ? 'red' : 'yellow'
    }
  }
}
</script>
