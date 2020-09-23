<template>
  <Table :headers="headers" :items="items">
    <template slot="col-date" slot-scope="{value}">{{ $d(value, 'short', 'ru-RU') }}</template>
    <span slot="col-type" slot-scope="{value}" class="operations-table__col-type">{{ $t(OperationType[value]) }}</span>
    <Assessment slot="col-assessment" slot-scope="{value}" :type="value"/>
  </Table>
</template>

<script lang="ts">
import Vue from 'vue';

import {OperationType} from "@/models/Operation";
import Table from "@/components/Table.vue";
import Assessment from "@/components/Assessment.vue";

export default Vue.extend({
  name: 'OperationsTable',
  components: {
    Table,
    Assessment,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      OperationType,
      headers: [
        {text: this.$t('DATE'), value: 'date'},
        {text: this.$t('TYPE'), value: 'type'},
        {text: this.$t('AREA'), value: 'area'},
        {text: this.$t('ASSESSMENT'), value: 'assessment'},
      ],
    };
  },
});
</script>
<style lang="scss">
.operations-table {
  &__col-type {
    font-weight: 500;
  }
}
</style>
