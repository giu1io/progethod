<template>
  <div>
    <div class="flex justify-between items-center pb-2 flex-col">
      <p class="text-xs text-indigo-700 font-bold">
        {{ fill }}% {{ $t('sent') }}
      </p>
      <p class="text-xs font-bold text-gray-800">
        {{ $t('please_wait_sending') }}
      </p>
    </div>
    <div class="flex items-center">
      <div class="w-full bg-gray-200 h-1 mr-1 rounded-tl rounded-bl relative">
        <div class="h-1 bg-indigo-700 transition-transform w-full origin-left" :style="{ transform: `scaleX(${fill / 100})` }" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fill: {
      default: 0,
      type: Number
    }
  }
}
</script>

<style>

</style>
