<template>
  <div class="base-input">
    <input
      class="base-input__input"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      @input="inputHandle($event)"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
  },
  methods: {
    // Ввод данных
    inputHandle(event) {
      this.$emit("input", event.target.value);
    },
  }
}
</script>

<style lang="scss" scoped>
.base-input {
  width: 160px;

  &__input {
    background: none;
    border: none;
    height: 30px;
    border-bottom: 1px solid white;
    color: white;
    outline: none;
    &::placeholder {
      color: white;
    }
  }
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
