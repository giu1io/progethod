<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="clock">
    <div class="top" />
    <div class="right" />
    <div class="bottom" />
    <div class="left" />
    <div class="center" />
    <div class="hour" />
    <div class="minute" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss">
* {
  margin: 0;
  padding: 0;
  border: 0;
}

html, body {
  min-height: 100%;
}

.clock {
  position: relative;
  height: 25px;
  width: 25px;
  box-sizing: border-box;
  border-radius: 100%;
  border: 1px solid black;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  .top {
    position: absolute;
    width: 1px;
    height: 2px;
    background: #262626;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .right {
    position: absolute;
    width: 2px;
    height: 1px;
    background: #262626;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto 0;
  }
  .bottom {
    position: absolute;
    width: 1px;
    height: 2px;
    background: #262626;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
  }
  .left {
    position: absolute;
    width: 2px;
    height: 1px;
    background: #262626;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto 0;
  }
  .center {
    height: 1px;
    width: 1px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #262626;
    border-radius: 100%;
  }
  .hour {
    width: 2px;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    animation: time 5s infinite linear;
    &:before {
      position: absolute;
      content: "";
      background: #262626;
      height: 10px;
      width: 2px;
      top: 0px;
    }
    &.backwards {
      animation: backwardsTime 5s infinite linear;
    }
  }
  .minute {
    width: 1px;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    animation: time 2s infinite linear;
    &:before {
      position: absolute;
      content: "";
      background: #262626;
      height: 5px;
      width: 1px;
      top: 5px;
    }
    &.backwards {
      animation: backwardsTime 2s infinite linear;
    }
  }
}

@keyframes time {
  to {
    transform: rotate(360deg);
  }
}

@keyframes backwardsTime {
  to {
    transform: rotate(-360deg);
  }
}
</style>
