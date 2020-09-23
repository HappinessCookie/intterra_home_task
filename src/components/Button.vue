<template>
  <button
      class="button"
      :class="classes"
      type="button"
      @click="$emit('click', $event)"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        'button--active': this.active,
      };
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/theme";

.button {
  color: inherit;
  background-color: #fff;
  padding: 12px 15px;
  border: 0;
  border-radius: 25px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &--active {
    color: $color--primary;
  }
}
</style>
