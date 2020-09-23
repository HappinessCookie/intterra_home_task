<template>
  <table class="table">
    <thead class="table__head">
    <tr>
      <th v-for="column in headers" :key="column.value">
        <div class="table__head-item" @click="sortByColumn(column)">
          <span>{{ column.text }}</span>
          <span class="table__sort-icon" :class="{
            'table__sort-icon--active': sortCol === column,
            [`table__sort-icon--${sortDirection}`]: sortCol === column
          }"></span>
        </div>
      </th>
    </tr>
    </thead>
    <tbody class="table__body">
    <tr v-for="row in data" :key="row.id">
      <td v-for="column in headers" :key="column.value" class="table__body-item">
        <slot :name="`col-${column.value}`" :value="row[column.value]">{{ row[column.value] }}</slot>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";

enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

interface Column {
  text: string;
  value: string;
}

export default Vue.extend({
  name: 'Table',
  props: {
    headers: {
      type: Array as PropType<Column[]>,
      required: true,
    },
    items: {
      type: Array as PropType<any[]>,
      required: true,
    }
  },
  data() {
    return {
      sortCol: this.headers[0],
      sortDirection: SortDirection.ASC,
    }
  },
  computed: {
    data() {
      const list = this.items.map(item => item);
      const sortProp = this.sortCol.value;
      const sortDirection = this.sortDirection === SortDirection.ASC ? 1 : -1;
      list.sort(({[sortProp]: a}, {[sortProp]: b}) => {
        if (a === null) {
          return sortDirection;
        }
        if (b === null) {
          return -sortDirection;
        }
        if (a > b) {
          return sortDirection;
        }
        if (a < b) {
          return -sortDirection;
        }
        return 0;
      });
      return list;
    },
  },
  methods: {
    sortReverse() {
      this.sortDirection = this.sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    },
    sortByColumn(column: Column) {
      if (this.sortCol === column) {
        this.sortReverse();
      } else {
        this.sortCol = column;
        this.sortDirection = SortDirection.ASC;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import "src/theme";

.table {
  width: 100%;
  text-align: left;
  border: 0;
  border-spacing: 0;

  &__head {
    background-color: $color--light;

    &-item {
      display: inline-flex;
      align-items: center;
      padding: 15px 10px 12px;
      font-weight: 500;
      user-select: none;
      cursor: pointer;
    }
  }

  &__body {
    &-item {
      padding: 10px;
      border-bottom: 1px solid $color--light;
    }
  }

  &__sort-icon {
    margin-left: 5px;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #A7A9AC transparent transparent transparent;
    transition: transform 150ms ease;

    &--active {
      border-color: $color--primary transparent transparent transparent;
    }

    &--desc {
      transform: rotate(180deg);
    }
  }
}
</style>
