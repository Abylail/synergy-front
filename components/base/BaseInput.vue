<template>
  <div class="base-input" :class="{'base-input--dark': dark}">
    <input
      class="base-input__input"
      :value="value"
      :type="type"
      :style="{fontSize: fontSize}"
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
    fontSize: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ""
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // Ввод данных
    inputHandle(event) {
      this.$emit("input", event.target.value);
      this.$forceUpdate();
    },
  }
}
</script>

<style lang="scss" scoped>
.base-input {
  width: 200px;

  &__input {
    width: inherit;
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

  &--dark > .base-input__input {
    border-bottom: 1px solid black;
    color: black;
    &::placeholder {
      color: #4b4b4b;
    }
  }

}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
