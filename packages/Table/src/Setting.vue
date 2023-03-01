<template>
  <div class="dk-cs">
    <el-popover
      v-model:visible="visible"
      placement="top"
      :width="320"
      trigger="click"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px; padding: 0px;">
      <template #reference>
        <el-button type="primary" link>
          <i class="iconfont icon-setting" :style="{fontSize: '20px'}"/>
        </el-button>
      </template>
      <ul class="dk-cs__body">
        <el-scrollbar max-height="360px">
          <draggable v-model="columns" item-key="prop" tag="transition-group" v-bind="dragOptions">
            <template v-for="(element, index) in columns" :key="index">
              <li v-show="element.label" class="dk-cs__item">
                <el-checkbox v-model="element.show"></el-checkbox>
                <div class="dk-cs__label"> {{ element.label }}</div>
                <el-checkbox-group size="small" :model-value="[element.fixed]" @change="changeFixedHandle($event, element)">
                  <el-checkbox-button v-for="radio in fixedSettingConfigs" :key="radio.label" :label="radio.value">
                  {{ radio.label }}
                  </el-checkbox-button>
                </el-checkbox-group>
              </li>
            </template>
          </draggable>
        </el-scrollbar>
      </ul>
      <div class="dk-cs__footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { VueDraggableNext as draggable } from 'vue-draggable-next';
interface Props {
  /** 表格列数据 */
  modelValue: any[];
}
const props = withDefaults(defineProps<Props>(), {});

type Emits = (e: "update", v: any[], t?:boolean) => void;
const emits = defineEmits<Emits>();

const visible = ref(false);
const fixedSettingConfigs = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
];
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  };
});
const columns = computed({
  set(v: any[]) {
    emits('update', v);
  },
  get() {
    return props.modelValue;
  },
});

const handleSubmit = () => {
  visible.value = false
  emits('update', columns.value, true)
}

function changeFixedHandle(value: any, item: any) {
  item.fixed = (value || []).pop();
}
</script>

<style lang="scss" scoped>
.dk-cs{
  &__body{
    padding: 15px;
  }
  &__item{
    display: flex;
    align-items: center;
    height: 32px;
    cursor: pointer;
  }
  &__label{
    flex: 1;
    padding: 0 10px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  &__footer{
    border-top: 1px solid #EEE;
    padding: 15px;
    text-align: right;
  }
}
</style>
