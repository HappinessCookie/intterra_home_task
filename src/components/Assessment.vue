<template>
  <div class="assessment" :class="{[assessmentClasses[type]]: Assessment[type]}">
    <div class="assessment__icon"></div>
    <span>{{ this.$t(Assessment[this.type] || "NO_RATING") }}</span>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import {Assessment} from "@/models/Operation";

const assessmentClasses = {
  [Assessment.BADLY]: "assessment--red",
  [Assessment.SATISFACTORILY]: "assessment--yellow",
  [Assessment.EXCELLENT]: "assessment--green",
}

export default Vue.extend({
  name: 'Assessment',
  props: {
    type: {
      type: Number as PropType<Assessment>,
      default: -1,
    },
  },
  data() {
    return {
      Assessment,
      assessmentClasses,
    }
  },
});
</script>

<style scoped lang="scss">
@import "src/theme";

.assessment {
  display: flex;
  align-items: center;

  &__icon {
    width: 20px;
    height: 10px;
    border-radius: 5px;
    margin-right: 5px;
    background-color: $color--light;
  }

  &--red &__icon {
    background-color: $color--danger;
  }

  &--yellow &__icon {
    background-color: $color--warning;
  }

  &--green &__icon {
    background-color: $color--success;
  }
}
</style>
