<template>
  <div class="registration auth-page" v-if="!isSuccessRegistration" @keyup.enter="registrationHandle()">
    <img class="auth-page__image" alt="logo" :src="require('assets/images/logo.svg')"/>
    <h2 class="auth-page__subtitle">Добро пожаловать в <span class="auth-page__subtitle-red">Synergy</span></h2>
    <h1 class="auth-page__title">РЕГИСТРАЦИЯ</h1>
    <base-input class="auth-page__input" :value="form.iin" @input="setIin($event)" type="number" placeholder="ИИН"/>
    <base-input class="auth-page__input" v-model="form.fio" placeholder="ФИО"/>
    <base-input class="auth-page__input" v-model="form.email" type="email" placeholder="Email"/>
    <base-input class="auth-page__input" v-model="form.password" type="password" placeholder="Пароль"/>
    <base-button class="auth-page__button" :loading="isLoading" @click="registrationHandle()">Зарегестрироваться</base-button>
  </div>
  <success-window v-else/>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
import {mapActions} from "vuex";
import SuccessWindow from "@/components/common/registration/successWindow";
export default {
  name: "index",
  components: {SuccessWindow, BaseButton, BaseInput},
  data: () => ({
    // Форма для логина
    form: {
      iin: null,
      fio: null,
      email: null,
      password: null,
    },

    isLoading: false,

    // Зарегестрированно
    isSuccessRegistration: false,
  }),
  methods: {
    ...mapActions({
      _registration: "user/registration",
    }),
    // Валидировать email
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    },
    // Валидировать ИИН
    validateIin() {
      return true;
    },
    // Валидация
    validate() {
      if (!this.form.iin) {
        alert("Введите ИИН");
        return false;
      }
      if (!this.form.fio) {
        alert("Введите ФИО");
        return false;
      }
      if (!this.form.email) {
        alert("Введите Email");
        return false;
      }
      if (!this.validateEmail(this.form.email)) {
        alert("Введите корректный Email");
        return false;
      }
      if (!this.form.password) {
        alert("Введите пароль");
        return false;
      }
      return true;
    },

    // Регистрация кнопка
    async registrationHandle() {
      this.isLoading = true;
      if (this.validate()) {
        const {isSuccess, errorMessage} = await this._registration({
          iin: this.form.iin,
          fio: this.form.fio,
          email: this.form.email,
          password: this.form.password,
        })

        if (isSuccess) {
          this.isSuccessRegistration = true;
          setTimeout(() => {window.location.href = `${process.env.MAIN_HOST}/Synergy`}, 1000)
        }
        else alert(errorMessage || "Ошибка регистрации");
      }
      this.isLoading = false;
    },

    clear() {
      this.form = {iin: null, fio: null, email: null};
    },

    // Запись иин
    setIin(val) {
      this.form.iin = val.substring(0, 12);
    },
  }
}
</script>

<style scoped>

</style>
