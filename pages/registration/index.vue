<template>
  <div class="registration auth-page">
    <img class="auth-page__image" alt="logo" :src="require('@/assets/images/logo.svg')"/>
    <h2 class="auth-page__subtitle">Добро пожаловать в <span class="auth-page__subtitle-red">Synergy</span></h2>
    <h1 class="auth-page__title">РЕГИСТРАЦИЯ</h1>
    <base-input class="auth-page__input" v-model="form.iin" type="number" placeholder="ИИН"/>
    <base-input class="auth-page__input" v-model="form.fio" placeholder="ФИО"/>
    <base-input class="auth-page__input" v-model="form.email" type="email" placeholder="Email"/>
    <base-button class="auth-page__button" @click="registrationHandle()">Зарегестрироваться</base-button>
  </div>
</template>

<script>
import BaseInput from "~/components/base/BaseInput";
import BaseButton from "~/components/base/BaseButton";
export default {
  name: "index",
  components: {BaseButton, BaseInput},
  data: () => ({
    // Форма для логина
    form: {
      iin: null,
      fio: null,
      email: null
    },

    isLoading: false,
  }),
  methods: {
    // Валидация
    validate() {

    },

    // Регистрация кнопка
    registrationHandle() {

    },

    clear() {
      this.form = {iin: null, fio: null, email: null};
    }
  }
}
</script>

<style scoped>

</style>
