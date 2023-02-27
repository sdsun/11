<template>
  <div class="full">
    <GTable
      ref="table"
      fullscreen
      border
      countable
      copyable
      checkable
      showOverflowTooltip
      headerAlign="left"
      :loading="loading"
      :data="tableData"
      :columns="columns"
      :pagination="pagination"
      @page-size-change="handlePageSizeChange"
      @page-current-change="handleCurrentChange"
    >
      <template #tableRight>
        <GTableSetting v-model="columns" :append-to-body="false" />
      </template>
    </GTable>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { GTable, GTableSetting } from 'packages';
import { GTableStatus } from 'packages/TableStatus';
import { ElTooltip } from 'element-plus';

const sourceData = ref<Array<any>>([]); // 源数据缓存
const tableData = ref<Array<any>>([]);
const countryData = ref<Array<any>>([
  {
    label: 'HPK',
    value: 0,
  },
  {
    label: 'HAK',
    value: 1,
  },
  {
    label: 'HBK',
    value: 2,
  },
  {
    label: 'HCK',
    value: 3,
  },
]);
const sideData = ref<Array<any>>([
  {
    label: 'Southside',
    value: 0,
  },
  {
    label: 'Northside',
    value: 1,
  },
  {
    label: 'Westside',
    value: 2,
  },
  {
    label: 'Eastside',
    value: 3,
  },
]);
for (let i = 0; i < 100; i++) {
  sourceData.value.push({
    code: `HPKTEM20220000${i}`,
    name: `HPK SHOP ${i}`,
    dimension: '500',
    status: Number(i % 2 === 0),
    rStatus: Number(Math.floor(Math.random() * 10) % 2 === 0),
    country: countryData.value[i % countryData.value.length].label,
    address: sideData.value[i % sideData.value.length].label,
  });
}

const columns: any = ref([
  {
    label: 'Shop Code',
    prop: 'code',
    width: 400,
    sortable: true,
  },
  {
    label: 'Shop Name',
    prop: 'name',
    width: 400,
  },
  {
    label: 'Not Retail Status',
    prop: 'rStatus',
    width: 200,
    cellRenderer(props: any) {
      return h(
        'div',
        {
          class: 'status-container',
        },
        [
          h('div', {
            class: props.row.rStatus
              ? 'status-container__circle circle-active'
              : 'status-container__circle circle-error',
          }),
          h('div', { class: 'status-container__font' }, props.row.rStatus ? 'Acitve' : 'Inactive'),
        ],
      );
    },
  },
  {
    label: 'Shop Status',
    prop: 'status',
    width: 200,
    cellRenderer(props: any) {
      return h(
        GTableStatus,
        {
          status: props.row.status + 1,
        },
        {
          default: () => (props.row.status ? 'Open' : 'Closed'),
        },
      );
    },
  },
  {
    label: 'Shop Dimension',
    prop: 'dimension',
    width: 400,
    headerRenderer(props: any) {
      console.log(props);
      return h('div', {}, [
        props.column.label,
        h(
          ElTooltip,
          {
            content: 'Total: 500（temp）',
          },
          {
            default: () => h('i', { class: 'iconfont icon-sum' }),
          },
        ),
      ]);
    },
  },
  {
    label: 'Country',
    prop: 'country',
    width: 400,
    filterType: 'select',
    filterOpts: countryData,
    filterOptKeys: ['label', 'value'],
    onFilter(value: any) {
      if (value) {
        loading.value = true;
        setTimeout(() => {
          const result = sourceData.value.filter((item: any) => {
            return item.country.indexOf(value.label) > -1;
          });
          pagination.currentPage = 1;
          pagination.total = result.length;
          tableData.value = result.slice(0, pagination.pageSize);
          loading.value = false;
        }, 500);
      } else {
        // reset
        resetTableData();
      }
    },
  },
  {
    label: 'Address',
    prop: 'address',
    width: 400,
    filterType: 'checkbox',
    filterOpts: sideData,
    filterOptKeys: ['label', 'label'],
    onFilter(value: any) {
      if (value.length > 0) {
        loading.value = true;
        setTimeout(() => {
          const result = sourceData.value.filter((item) => value.indexOf(item.address) > -1);
          pagination.total = result.length;
          pagination.currentPage = 1;
          tableData.value = result.slice(0, pagination.pageSize);
          loading.value = false;
        }, 500);
      } else {
        // reset
        resetTableData();
      }
    },
  },
  {
    label: 'Action',
    width: 100,
    cellRenderer(props: any) {
      return h('div', { class: 'action-btn' }, [
        h('i', { class: 'iconfont icon-ellipsis' }),
        h('i', { class: 'iconfont icon-setting' }),
        h('i', { class: 'iconfont icon-search' }),
      ]);
    },
  },
]);
const resetTableData = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    pagination.total = sourceData.value.length;
    tableData.value = sourceData.value.slice(0, pagination.pageSize);
  }, 500);
};

const loading = ref(true);
const pagination = reactive({
  pageSize: 5,
  currentPage: 1,
  background: true,
  total: sourceData.value.length,
});

const handlePageSizeChange = (size: number) => {
  tableData.value = sourceData.value.slice(
    (pagination.currentPage - 1) * pagination.pageSize,
    pagination.currentPage * size,
  );
};

const handleCurrentChange = (current: number) => {
  tableData.value = sourceData.value.slice((current - 1) * pagination.pageSize, current * pagination.pageSize);
};

setTimeout(() => {
  loading.value = false;
  tableData.value = sourceData.value.slice(0, pagination.pageSize);
}, 1500);
</script>

<style lang="scss" scoped>
.full {
  ::v-deep .action-btn {
    display: flex;
    justify-content: space-between;
    .iconfont {
      color: var(--el-color-primary);
    }
  }
  ::v-deep .status-container {
    display: flex;
    align-items: center;
    .status-container__circle {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 5px;
    }
    .circle-active {
      background: #1be993;
    }
    .circle-error {
      background: rgb(247, 55, 55);
    }
    .status-container__font {
      font-size: 12px;
      color: #545252;
    }
  }
}
</style>
