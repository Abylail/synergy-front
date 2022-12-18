<template>
  <div class="lang-switch" @focusout="showList = false">

    <!-- Этикетка -->
    <div class="lang-switch__label" @click="showList = !showList">
      {{ currentLangName }}
      <div class="lang-switch__label-arrow" :class="{active: showList}"/>
    </div>

    <!-- Список -->
    <div class="lang-switch__list" v-show="showList" @click="showList = false">
      <nuxt-link
        class="lang-switch__lang"
        v-for="locale in locales" :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >{{ locale.name }}</nuxt-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "langSwitch",
  data: () => ({
    // Показать список языков
    showList: false,
  }),
  computed: {
    // Список языков
    locales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },

    // Название текущего языка
    currentLangName() {
      return this.$i18n.locales.find(l => l.code === this.$i18n.locale)?.name || "Русский";
    },
  }
}
</script>

<style lang="scss" scoped>
.lang-switch {
  position: absolute;
  right: 40px;
  top: 40px;
  color: white;
  z-index: 1;
  text-align: right;
  cursor: pointer;

  &__label {
    user-select: none;
  }

  &__label-arrow {
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    margin-left: 5px;
    margin-bottom: 3px;
    transition: .3s;
    &.active {
      transform: rotate(225deg);
      margin-bottom: 0;
    }
  }

  &__list {
    position: absolute;
    text-align: left;
    user-select: none;
  }

  &__lang {
    display: inline-block;
    color: white;
    cursor: pointer;
    text-decoration: none;
    padding-top: 10px;
    &:hover {color: #EF3F39;}
    &.nuxt-link-exact-active {color: #EF3F39;}
  }
}
</style>
