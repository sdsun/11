<script setup lang="ts">
import { ref } from "vue";
import WarpTransition from "./Transition.vue";

const visible = ref(true);
interface Props {
  /** 标题 默认: "" */
  title: string;
  /** 主题 默认: 'default' */
  type?: "default" | "card";
  /** 是否带有下边框 默认:true */
  hasBorder?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
  type: "default",
  hasBorder: true
});
const handleToggole = () => {
  visible.value = !visible.value
};
</script>

<template>
  <div
    class="dk-fg"
    :class="{ active: visible, dkcard: props.type === 'card' }"
    :style="{ borderBottom: hasBorder ? '1px solid #EEE' : 'none' }"
  >
    <div class="dk-fg__title">
      <h5>{{ props.title }}</h5>
      <div class="dk-fg__desc">
        <slot name="desc" />
      </div>
      <i class="iconfont icon-arrow-right" @click="handleToggole" />
    </div>
    <WarpTransition>
      <div v-show="visible" ref="content" class="dk-fg__body">
        <slot />
      </div>
    </WarpTransition>
  </div>
</template>

<style lang="scss" scoped>
.dk-fg {
  background: #fff;
  overflow: hidden;
  &.dkcard {
    border: 1px solid #eee;
    box-shadow: 0 3px 10px rgba($color: #333333, $alpha: 0.1);
    border-radius: 6px;
    margin-bottom: 20px;
  }
  &.active {
    .dk-fg__title {
      i {
        transform: rotate(90deg);
      }
    }
  }
  &__title {
    padding: 0 20px;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h5 {
      position: relative;
      font-weight: bold;
      font-size: 15px;
      padding-left: 12px;
      color: #333;
      &::before {
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -6px;
        content: "";
        display: block;
        width: 4px;
        height: 12px;
        border-radius: 2px;
        background: var(--el-color-primary);
      }
    }
    div {
      flex: 1;
      padding: 0 20px;
      font-size: 14px;
      color: #666;
    }
    i {
      transition: all 0.5s;
      color: #999;
      padding: 10px;
      cursor: pointer;
    }
  }
  &__body {
    padding: 20px;
  }
}
</style>
