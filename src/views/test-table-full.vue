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
      @change-columns="handleChangeColumns"
    >
      <template #tableLeft><GTableButton :options="options" /></template>
      <template #action>
        <div class="action-btn">
          <!-- EDIT -->
          <i class="iconfont icon-edit" @click="handleOpen" />
          <!-- DETAIL -->
          <i class="iconfont icon-details" @click="openDrawer1" />
          <!-- DELETE -->
          <el-popconfirm title="Are you sure to delete this?">
            <template #reference>
              <i class="iconfont icon-del" />
            </template>
          </el-popconfirm>
          <!-- MORE -->
          <el-dropdown>
            <span class="el-dropdown-link">
              ···
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </GTable>
    <GDrawerPanel
      v-model:visible="visible"
      title="Edit"
      :loading="editLoading"
      :is-edit="true"
      @update:model-value="closeDrawer"
      @submit="handleSubmit"
    >
      <el-form :model="form" label-width="120px">
        <h1 :style="{ margin: '20px' }">风格1: 默认</h1>
        <GSectionGroup title="BASIC">
          <template #desc> desc this part</template>
          <el-form-item label="Activity name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </GSectionGroup>
        <GSectionGroup title="BASIC">
          <template #desc> desc this part</template>
          <el-form-item label="Activity name">
            <el-input v-model="form.name1" />
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-select v-model="form.region1" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </GSectionGroup>
      </el-form>
    </GDrawerPanel>
    <GDrawerPanel
      v-model:visible="visible1"
      title="Detail"
      bodyColor="grey"
      :loading="loading1"
      @update:model-value="closeDrawer1"
    >
      <el-form :model="form" label-width="120px">
        <h1 :style="{ margin: '20px' }">风格2:Card</h1>
        <GSectionGroup title="CARD" type="card">
          <el-form-item label="Activity form :"> Test Data </el-form-item>
        </GSectionGroup>
        <GSectionGroup title="CARD" type="card">
          <el-form-item label="Activity form :"> Test Data </el-form-item>
        </GSectionGroup>
      </el-form>
    </GDrawerPanel>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { GTable, GTableSetting, GDrawerPanel, GSectionGroup, GTableButton } from 'packages';
import { GTableStatus } from 'packages/TableStatus';
import { ElTooltip } from 'element-plus';
import useDrawer from '@/hooks/useDrawer';

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
    dimension: '500.00',
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
    width: 240,
    sortable: true,
    show: true,
    hide(attr: any, column: any) {
      return column.show === false;
    },
  },
  {
    label: 'Shop Name',
    prop: 'name',
    show: true,
    width: 320,
    hide(attr: any, column: any) {
      return column.show === false;
    },
  },
  {
    label: 'Not Retail Status',
    prop: 'rStatus',
    show: true,
    hide(attr: any, column: any) {
      return column.show === false;
    },
    width: 160,
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
    show: true,
    width: 120,
    hide(attr: any, column: any) {
      return column.show === false;
    },
    cellRenderer(props: any) {
      return h(
        GTableStatus,
        {
          statusData: {
            status: props.row.status + 1,
            color: `status${props.row.status + 1}`,
          },
        },
        {
          default: () => (props.row.status ? 'Open' : 'Closed'),
        },
      );
    },
  },
  {
    label: 'Rp',
    prop: 'dimension',
    show: true,
    width: 140,
    align: 'right',
    hide(attr: any, column: any) {
      return column.show === false;
    },
    headerRenderer(props: any) {
      return h('div', {
        style: { textAlign: "right" }
      }, [
        props.column.label,
        h(
          ElTooltip,
          null,
          {
            default: () => h('i', { class: 'iconfont icon-sum' }),
            content: () => h('div', { innerHTML: 'Current page total: 500.00 <br />All page total: 5000.00' }),
          },
        ),
      ]);
    },
  },
  {
    label: 'Country',
    prop: 'country',
    width: 140,
    show: true,
    hide(attr: any, column: any) {
      return column.show === false;
    },
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
    show: true,
    width: 320,
    hide(attr: any, column: any) {
      return column.show === false;
    },
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
    width: 140,
    show: true,
    hide(attr: any, column: any) {
      return column.show === false;
    },
    fixed: 'right',
    slot: 'action'
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
  pageSize: 10,
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
const handleChangeColumns = (v:any[], t?:boolean) => {
  columns.value = v
  t && handleSetColumns(v)
}
const handleSetColumns = (v:any[]) => {
  alert(`调用后端配置列${JSON.stringify(v)}`)
} 
setTimeout(() => {
  loading.value = false;
  tableData.value = sourceData.value.slice(0, pagination.pageSize);
}, 1500);

const { loading: editLoading, visible, openDrawer, closeDrawer, openLoading, closeLoading } = useDrawer();
const { loading: loading1, visible: visible1, openDrawer: openDrawer1, closeDrawer: closeDrawer1 } = useDrawer();
const form = reactive({
  name: '',
  region: '',
  name1: '',
  region1: '',
  desc: '',
  desc1: '',
});
const handleOpen = () => {
  openDrawer();
  openLoading();
  setTimeout(() => {
    closeLoading();
  }, 1200);
};
const handleSubmit = () => {
  console.log('submit');
};

const options = reactive([
  {
    type: 'new',
    label: 'New',
    icon: '',
    iconOpen: false,
    iconName: '新建',
  },
  {
    type: 'upload',
    label: 'Upload',
    icon: 'icon-shangchuan',
    iconOpen: false,
    iconName: '上传',
  },
  {
    type: 'download',
    label: 'Download',
    icon: 'icon-xiazai',
    iconOpen: false,
    iconName: '下载',
  },
  {
    type: 'formwork',
    label: 'Template',
    icon: 'icon-xiazai',
    iconOpen: false,
    iconName: '模板下载',
  },
  {
    type: '2',
    label: 'Select All',
    icon: '',
    iconOpen: false,
    iconName: '',
  },
]);
</script>

<style lang="scss" scoped>
.full {
  height: 100%;
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
