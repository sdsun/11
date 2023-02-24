<script setup lang="ts">
import { ElMessageBox } from "element-plus";

interface Props {
  /** 显示状态 默认:false */
  visible: boolean;
  /** 加载状态 默认:false */
  loading?: boolean;
  /** 主体背景颜色 默认:'light' */
  bodyColor?: "light" | "grey";
  /** 标题 默认:"" */
  title?: string;
  /** 提交按钮文案 默认:Submit */
  submitText?: string;
  /** 取消按钮文案 默认:Cancel */
  cancelText?: string;
  /** 是否显示提交按钮 默认:true */
  showSubmitBtn?: boolean;
  /** 是否显示取消按钮 默认:true */
  showCancelBtn?: boolean;
  /** 自身是否插入至 body 元素上 默认:fasle */
  appendToBody?: boolean;
  /** 窗体的大小 取值像素或百分比 默认:30% */
  size?: number | string;
  /** 是否是编辑 默认:false */
  isEdit?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  loading: false,
  bodyColor: "light",
  title: "",
  submitText: "Submit",
  cancelText: "Cancel",
  showSubmitBtn: true,
  showCancelBtn: true,
  appendToBody: false,
  size: "30%",
  isEdit: false
});

interface Emits {
  /** 更新显示状态 */
  (e: "update:modelValue", v: boolean): void;
  /** 提交方法 */
  (e: "submit"): void;
}

const emits = defineEmits<Emits>();
const updateModelValue = (v: boolean) => emits("update:modelValue", v);
const handleSubmit = () => emits("submit");
const handleClose = (done: () => void) => {
  if (props.isEdit) {
    ElMessageBox.confirm("Are you sure you want to close this?", "Warning", {
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      type: "warning"
    })
      .then(() => {
        done();
      })
      .catch(() => {
        // catch error
      });
  } else {
    done();
  }
};
</script>

<template>
  <el-drawer
    :model-value="props.visible"
    :title="props.title"
    :class="`dk-drawer ${props.bodyColor}`"
    :size="props.size"
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="!isEdit"
    :append-to-body="props.appendToBody"
    :before-close="handleClose"
    @close="updateModelValue(false)"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass" :style="{ color: '#333' }">
        <i
          class="iconfont icon-arrow-right_c"
          :style="{ marginRight: '5px', fontSize: '20px' }"
          @click="close"
        />
        <span>{{ props.title }}</span>
      </h4>
      <div v-if="isEdit" class="dk-drawer__actions">
        <el-button v-if="props.showCancelBtn" @click="close">
          {{ props.cancelText }}
        </el-button>
        <slot name="actions" />
        <el-button
          v-if="props.showSubmitBtn"
          type="primary"
          @click="handleSubmit"
        >
          {{ props.submitText }}
        </el-button>
      </div>
    </template>
    <div v-loading="props.loading" :class="{'dh-loading': props.loading}">
      <slot />
    </div>
  </el-drawer>
</template>

<style lang="scss">
.dk-drawer {
  .el-drawer__header {
    border-bottom: 1px solid #eee;
    box-shadow: 0 3px 5px rgba($color: #333333, $alpha: 0.1);
    padding-bottom: var(--el-drawer-padding-primary);
    margin: 0;
  }
  .el-drawer__title {
    display: flex;
    align-items: center;
  }
  .dh-loading{
    height: 100%;
    overflow: hidden;
  }
  &.light {
    .el-drawer__body {
      background: #fff;
    }
  }
  &.grey {
    .el-drawer__body {
      background: #f2f2f2;
    }
  }
}
</style>
