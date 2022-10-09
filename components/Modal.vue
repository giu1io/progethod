<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    id="modal"
    class="py-12 dark:bg-black bg-gray-700 transition-opacity z-10 absolute top-0 right-0 bottom-0 left-0"
    :class="{'opacity-0': !value, 'pointer-events-none': !value, 'opacity-100': value}"
  >
    <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-xl flex justify-center">
      <div class="relative w-11/12 sm:w-8/12 md:w-9/12 bg-white dark:bg-gray-800 shadow pt-10 pb-8 rounded">
        <div class="flex flex-col items-center px-4 md:px-8">
          <slot />
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
import { XIcon } from 'vue-tabler-icons'

export default {
  components: {
    XIcon
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
  methods: {
    dismiss () {
      this.$emit('input', false)
    }
  }
}
</script>

<style>

</style>
