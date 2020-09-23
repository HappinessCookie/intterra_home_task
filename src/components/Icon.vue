<template functional>
  <img class="icon" :src="props.src">
</template>

<script>
export default {
  name: 'Icon',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.icon {
  display: block;
}
</style>
