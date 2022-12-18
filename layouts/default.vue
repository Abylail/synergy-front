<template>
  <div class="default-layout">
    <lang-switch/>
    <nuxt/>
  </div>
</template>

<script>
import LangSwitch from "~/components/common/layout/langSwitch";
export default {
  name: "default",
  components: {LangSwitch}
}
</script>

<style lang="scss" scoped>
.default-layout {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('~/assets/images/background.svg');
  background-size: cover;
}
</style>
