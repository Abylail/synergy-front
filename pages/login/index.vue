<template>
  <div class="login auth-page" @keyup.enter="loginHandle()">
    <img class="auth-page__image" alt="logo" :src="require('@/assets/images/logo.svg')"/>
    <h2 class="auth-page__subtitle">Добро пожаловать в <span class="auth-page__subtitle-red">Synergy</span></h2>
    <h1 class="auth-page__title">АВТОРИЗАЦИЯ</h1>
    <base-input class="auth-page__input" v-model="form.username" type="email" placeholder="Почта"/>
    <base-input class="auth-page__input" v-model="form.password" type="password" placeholder="Пароль"/>
    <base-button class="auth-page__button" :loading="isLoading" @click="loginHandle()">Войти</base-button>
    <a class="auth-page__link" @click="forgotPasswordHandle()">Забыли пароль?</a>
    <nuxt-link class="auth-page__link" :to="{path: 'registration', query: $route.query}">Регистрация</nuxt-link>

    <repassword-modal/>
  </div>
</template>

<script>
import BaseInput from "~/components/base/BaseInput";
import BaseButton from "~/components/base/BaseButton";
import {mapActions} from "vuex";
import RepasswordModal from "@/components/common/modal/repasswordModal";
export default {
  name: "index",
  components: {RepasswordModal, BaseButton, BaseInput},
  data: () => ({

    // Форма для логина
    form: {
      username: null,
      password: null
    },

    isLoading: false,
  }),
  methods: {
    ...mapActions({
      _login: "user/login",
    }),

    // Валидация
    validate() {
      if (!this.form.username || !this.form.password) return false;
      return true;
    },

    // Логин (кнопка)
    async loginHandle() {
      this.isLoading = true;
      if (this.validate()) {
        const isSuccess = await this._login({
          username: this.form.username,
          password: this.form.password,
        })
        if (isSuccess) this.$router.push(this.$route.query?.redirect || "/");
        this.clear();
      }
      this.isLoading = false;
    },

    // Забыли пароль
    async forgotPasswordHandle() {
      this.$modal.show("repassword");
    },

    // Очистить
    clear() {
      this.form.password = null;
    }
  }
}
</script>

<style lang="scss" scoped>
.login {

}
</style>
