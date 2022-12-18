<template>
  <button class="base-button" @click="$emit('click', $event)">
    <slot v-if="!loading"/>
    <div class="base-button__loader" v-else/>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-button {
  width: 240px;
  height: 58px;
  line-height: 58px;
  border: 1px solid white;
  background: none;
  border-radius: 100px;
  color: white;
  cursor: pointer;
  transition: .3s;

  &:active {
    background: white;
    color: #0a6dc9;
  }

  &__loader {
    &:after {
      content: " ";
      display: block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: 6px solid;
      border-color: white transparent white transparent;
      animation: rotation 1.2s linear infinite;
      margin: 0 auto;
    }
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
