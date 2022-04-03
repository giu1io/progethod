<template>
  <div class="flex mb-5">
    <div class="flex flex-col md:mr-16">
      <input id="project" class="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow" placeholder="Project">
    </div>
    <duration-input v-model="duration" :other="duration" />
    <input type="text" class="ml-5">
  </div>
</template>

<script>
import DurationInput from './DurationInput'

export default {
  components: {
    DurationInput
  },
  data () {
    return {
      duration: 0
    }
  }
}
</script>

<style>

</style>
