<template>
  <modal name="repassword" size="small" close-button @onHide="clear()">
    <div class="repassword-modal" @keyup.enter="submitHandle()">
      <div class="repassword-modal__title">Смена пароля</div>
      <div class="repassword-modal__form">
        <base-input v-model="form.login" placeholder="Логин" font-size="18px" dark/>
        <base-input v-model="form.password" placeholder="Пароль" type="password" font-size="18px" dark/>
        <base-input v-model="form.passwordConfirm" placeholder="Подтвердите пароль" type="password" font-size="18px" dark/>
        <base-button class="repassword-modal__submit" :loading="isLoading" dark @click="submitHandle()">Изменить пароль</base-button>
      </div>
    </div>
  </modal>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
import {mapActions} from "vuex";
export default {
  name: "repasswordModal",
  components: {BaseButton, BaseInput},
  data: () => ({
    form: {
      login: null,
      password: null,
      passwordConfirm: null,
    },
    isLoading: false,
  }),
  methods: {
    ...mapActions({
      _repassword: "user/repassword",
    }),
    // Валидация
    validate() {

      if (!this.form.login) {
        alert("Введите логин");
        return false;
      }

      if (!this.form.password) {
        alert("Введите пароль");
        return false;
      }

      if (!this.form.passwordConfirm) {
        alert("Повторите пароль");
        return false;
      }

      if (this.form.password !== this.form.passwordConfirm) {
        alert("Пароли не совпадают");
        return false;
      }

      return true;
    },

    // Если пароль успешно сменен
    onSuccess() {
      alert("Пароль успешно изменен");
      this.$modal.hide("repassword");
    },

    clear() {
      this.form = {
        login: null,
        password: null,
        passwordConfirm: null,
      }
    },

    // Изменить пароль
    async submitHandle() {
      this.isLoading = true;
      if (this.validate()) {
        let {isSuccess, errorMessage} = await this._repassword(this.form);
        if (isSuccess) this.onSuccess();
        else alert(errorMessage || "Ошибка при смене пароля")
      }
      this.isLoading = false;
    },
  }
}
</script>

<style lang="scss" scoped>
.repassword-modal {
  color: #2a2a2a;

  &__title {
    font-size: 24px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
  }

  &__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    & > * {
      margin-top: 10px;
    }
  }

  &__submit {
    margin-top: 20px;
  }
}
</style>
