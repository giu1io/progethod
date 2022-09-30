<template>
  <div class="flex justify-center ml-2 mr-2">
    <div id="filters" class="bg-transparent border-2 border-gray-200 dark:border-gray-800 rounded flex items-center">
      <button
        class="p-2 rounded border-transparent border focus:outline-none focus:text-indigo-700 dark:focus:text-indigo-700 hover:text-indigo-700 dark:hover:text-indigo-700 text-gray-800 dark:text-gray-50 flex justify-center items-center focus:bg-gray-100 dark:focus:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
        :class="{
          'text-indigo-700 bg-white cursor-default': value === 'home'
        }"
        :title="$t('home')"
        @click="select('home')"
      >
        <home-icon
          class="icon icon-tabler icon-tabler-home"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
        />
      </button>
      <button
        class="p-2 rounded border-transparent border focus:outline-none focus:text-indigo-700 dark:focus:text-indigo-700 hover:text-indigo-700 dark:hover:text-indigo-700 text-gray-800 dark:text-gray-50 flex justify-center items-center focus:bg-gray-100 dark:focus:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
        :class="{
          'text-indigo-700 bg-white cursor-default': value === 'office'
        }"
        :title="$t('office')"
        @click="select('office')"
      >
        <building-icon
          class="icon icon-tabler icon-tabler-building"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
        />
      </button>
    </div>
  </div>
</template>

<script>
import {
  BuildingIcon,
  HomeIcon
} from 'vue-tabler-icons'

export default {
  components: {
    BuildingIcon,
    HomeIcon
  },
  props: {
    value: {
      type: String,
      default: 'home'
    }
  },
  methods: {
    select (place) {
      this.$emit('input', place)
    }
  }
}
</script>

<style scoped>

</style>
