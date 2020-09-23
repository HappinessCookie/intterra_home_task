<template>
  <div class="field-card">
    <h1>{{ $t("OPERATION_ON_FIELD", {name: "112"}) }}</h1>
    <div class="field-card__toolbar">
      <ToggleGroup v-model="operationTime" :items="filterList">
        <div
            slot="item"
            slot-scope="{item, onSelect, active}"
            class="field-card__filter"
            :class="{'field-card__filter--active': active}"
            @click="onSelect"
        >{{ item.text }}
        </div>
      </ToggleGroup>
      <Button class="field-card__add-action">
        <Icon :src="iconAdd"/>
        {{ $t("ADD_OPERATION") }}
      </Button>
    </div>
    <div v-if="!operationListIsLoading" class="field-card__table">
      <OperationsTable :items="items"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters} from "vuex";

import Operation from "@/models/Operation";
import Button from "@/components/Button.vue";
import Icon from "@/components/Icon.vue";
import ToggleGroup from "@/components/ToggleGroup.vue";
import OperationsTable from "@/components/OperationsTable.vue";

import iconAdd from "@/theme/icons/icon-add.svg";

enum OperationTime {
  PLANNED = "planned",
  COMPLETED = "completed",
}

export default Vue.extend({
  name: 'Home',
  components: {
    Button,
    Icon,
    ToggleGroup,
    OperationsTable,
  },
  data() {
    return {
      iconAdd,
      operationTime: OperationTime.COMPLETED,
      filterList: [
        {
          value: OperationTime.PLANNED,
          text: this.$t("PLANNED_OPERATION"),
        },
        {
          value: OperationTime.COMPLETED,
          text: this.$t("COMPLETED_OPERATION"),
        },
      ]
    }
  },
  computed: {
    ...mapGetters("operation", {
      operationListIsLoading: "IS_LOADING",
      getOperationList: "GET_LIST",
    }),
    items(): any[] {
      const itemFilter = this.operationTime === OperationTime.COMPLETED
          ? (item: any) => item.date < new Date()
          : (item: any) => item.date >= new Date();
      return this.flat(this.getOperationList).filter(itemFilter);
    },
  },
  methods: {
    ...mapActions("operation", {
      loadOperationList: "load",
    }),
    flat(list: Operation[]) {
      return list.map((item: Operation) => {
        return {
          ...item,
          date: new Date(item.date.year, item.date.month, item.date.day),
        };
      });
    },
  },
  mounted() {
    this.loadOperationList();
  },
});
</script>
<style lang="scss">
@import "src/theme";

.field-card {
  width: 100%;
  max-width: 874px;
  padding: 0 30px;
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  &__toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    &-filter {
      display: grid;
      grid-gap: 18px;
      grid-auto-flow: column;
      grid-auto-columns: max-content;
      align-items: center;
      text-transform: uppercase;
    }
  }

  &__filter {
    text-transform: uppercase;

    &:first-child {
      margin-right: 18px;
    }

    &--active {
      color: $color--primary;
    }
  }

  &__add-action {
    display: grid;
    align-content: center;
    grid-template-columns: min-content 1fr;
    grid-gap: 7px;
  }
}
</style>
