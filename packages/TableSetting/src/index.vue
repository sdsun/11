<script lang="ts">
export default {
  name: 'GTableSetting',
  inheritAttrs: false,
};
</script>
<template>
  <div class="table-setting">
    <el-button :disabled="disabled" type="primary" link @click="clickSetting">
      <slot><i class="iconfont icon-setting"></i></slot>
    </el-button>
    <el-drawer v-model="drawerVisiable" append-to-body v-bind="$attrs">
      <template #default>
        <!-- <ul class="table-column-item">
          <li class="table-column-label">列名称</li>
          <li class="table-column-show">列显示</li>
          <li class="table-column-fixed">列固定</li>
        </ul> -->
        <ul class="table-columns">
          <draggable v-model="listInCom" item-key="prop" tag="transition-group" v-bind="dragOptions">
            <!-- <transition-group type="transition" name="flip-list"> -->
            <li v-for="(element, ei) in listInCom" :key="ei" class="table-column-item">
              <div class="table-column-check">
                <el-checkbox v-model="element.show" :disabled="element.show && showedColumnsLength < 2"></el-checkbox>
              </div>
              <div class="table-column-label">{{ element.type === 'selection' ? 'Checkbox' : element.label }}</div>
              <!-- <div class="table-column-show">
                <el-switch v-model="element.show" inline-prompt active-text="是" inactive-text="否" />
              </div> -->
              <div class="table-column-fixed">
                <el-checkbox-group :model-value="[element.fixed]" @change="changeFixedHandle($event, element)">
                  <el-checkbox-button v-for="radio in fixedSettingConfigs" :key="radio.label" :label="radio.value">{{
                    radio.label
                  }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </li>
            <pre>{{ modelValue }}</pre>

            <!-- </transition-group> -->
          </draggable>
        </ul>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { VueDraggableNext as draggable } from 'vue-draggable-next';
interface PropsInterface {
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt';
  showClose?: boolean;
  modelValue: any[];
  disabled?: boolean;
}
interface EmitsInterface {
  (e: 'update:model-value', value: any[]): void;
  (e: 'update:model-value', value: any[]): void;
}
const props = withDefaults(defineProps<PropsInterface>(), {});
const emits = defineEmits<EmitsInterface>();

const listInCom = computed({
  set(v: any[]) {
    emits('update:model-value', v);
  },
  get() {
    return props.modelValue.filter(item => item.label);
  },
});
const showedColumnsLength = computed(() => (props.modelValue || []).filter((item) => item.show).length);

const fixedSettingConfigs = [
  // { label: '不固定', value: false },
  { label: '左侧', value: 'left' },
  { label: '右侧', value: 'right' },
];

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  };
});
const drawerVisiable = ref(false);
function cancelClick() {
  drawerVisiable.value = false;
}
function confirmClick() {
  drawerVisiable.value = false;
  // ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
  //   .then(() => {
  //     drawerVisiable.value = false;
  //   })
  //   .catch(() => {
  //     // catch error
  //   });
}
function clickSetting() {
  drawerVisiable.value = true;
}
/* function fixedCommand(name: any) {
  console.log('name :>> ', name);
}
function returnItemFixedValue(value: any) {
  return (fixedSettingConfigs.find((item) => item.value === value) || fixedSettingConfigs[0]).label;
} */

function changeFixedHandle(value: any, item: any) {
  item.fixed = (value || []).pop();
}
defineExpose({ clickSetting });
</script>

<style lang="scss" scoped>
.table-setting {
  display: inline-block;
}
.icon-setting {
  font-size: 20px;
  // color: var(--el-color-primary)
}
.flip-list-move {
  transition: transform 0.5s;
}
.table-column-item {
  display: flex;
  height: 40px;
  align-items: center;
  user-select: none;
  &:hover {
    // background-color: var(--el-table-row-hover-bg-color);
    background-color: var(--el-fill-color-light);
  }
  .table-column-label {
    flex: 1 1 100px;
    text-align: left;
  }
  .table-column-check {
    width: 40px;
    text-align: left;
  }
  .table-column-show {
    text-align: center;
    flex: 0 0 100px;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .table-column-fixed {
    text-align: center;
    flex: 0 0 auto;
    height: 40px;
    display: flex;
    align-items: center;
  }
}
</style>
