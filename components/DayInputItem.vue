<template>
  <div>
    <h1>Monday 28th</h1>
    <div class="flex my-2">
      <label class="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2 w-64">Project</label>
      <label class="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2">Time</label>
    </div>
    <time-entry-item />
    <time-entry-item />
  </div>
</template>

<script>
import TimeEntryItem from '~/components/TimeEntryItem'

export default {
  components: {
    TimeEntryItem
  }
}
</script>

<style>

</style>
