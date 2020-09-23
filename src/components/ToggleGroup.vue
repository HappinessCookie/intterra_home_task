<template>
  <div class="toggle-group">
    <template v-for="item in items">
      <slot name="item" :active="value === item.value" :item="item" :onSelect="() => $emit('input', item.value)">
        <Button
            :active="value === item.value"
            @click="$emit('input', item.value)"
        >
          {{ item.text }}
        </Button>
      </slot>
    </template>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: 'ToggleGroup',
  components: {
    Button,
  },
  props: {
    value: {
      type: String,
    },
    items: {
      type: Array,
      required: true,
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
.toggle-group {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
}
</style>
