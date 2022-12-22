<template>
  <div class="success-window">
    <img class="success-window__image" alt="success" :src="require('@/assets/images/success.svg')"/>
    <div class="success-window__title">ЗАЯВКА ОТПРАВЛЕНА</div>
    <div class="success-window__text">Пожалуйста проверьте вашу почту</div>
    <base-button @click="goMain()">Вернуться на главную</base-button>
  </div>
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
export default {
  name: "successWindow",
  components: {BaseButton},
  methods: {
    // Вернуться на главную
    goMain() {
      window.location.href = process.env.MAIN_HOST+"/Synergy/index?state=0";
    }
  }
}
</script>

<style lang="scss" scoped>
.success-window {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__image {
    margin-bottom: 15px;
  }

  &__title {
    color: white;
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__text {
    color: white;
    font-size: 20px;
    margin-bottom: 20px;
  }

}
</style>
