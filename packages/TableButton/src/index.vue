<script lang="ts">
export default {
  name: 'GTableButton',
  inheritAttrs: false,
};
</script>
<template>
  <div class="table-button">
    <div v-for="(item, index) in buttonData" :key="index">
      <div v-if="item.type === 'new'" class="gtm-button">
        <span
          class="status"
          :class="item.icon ? 'radius-right' : 'radius-whole'"
          @click="item.icon ? '' : newEvent(item)"
          >{{ item.label }}</span
        >
        <span v-if="item.icon" class="icon" @mouseenter="mouseenter(item)" @mouseleave="mouseleave(item)"
          ><i class="iconfont" :class="item.icon"></i
        ></span>
        <transition name="fade">
          <span
            v-if="item.iconOpen"
            class="dropdown-open"
            @click="iconEvent(item)"
            @mouseenter="mouseenter(item)"
            @mouseleave="mouseleave(item)"
            ><i class="iconfont" :class="item.icon"></i><span>{{ item.iconName }}</span></span
          ></transition
        >
      </div>
      <div v-else-if="item.type === 'download'" class="gtm-button">
        <span
          class="status"
          :class="item.icon ? 'radius-right' : 'radius-whole'"
          @click="item.icon ? '' : downloadEvent(item)"
          >{{ item.label }}</span
        >
        <span v-if="item.icon" class="icon" @mouseenter="mouseenter(item)" @mouseleave="mouseleave(item)"
          ><i class="iconfont" :class="item.icon"></i
        ></span>
        <transition name="fade">
          <span
            v-if="item.iconOpen"
            class="dropdown-open"
            @click="iconEvent(item)"
            @mouseenter="mouseenter(item)"
            @mouseleave="mouseleave(item)"
            ><i class="iconfont" :class="item.icon"></i><span>{{ item.iconName }}</span></span
          >
        </transition>
      </div>
      <div v-else-if="item.type === 'upload'" class="gtm-button">
        <span
          class="status"
          :class="item.icon ? 'radius-right' : 'radius-whole'"
          @click="item.icon ? '' : uploadEvent(item)"
          >{{ item.label }}</span
        >
        <span v-if="item.icon" class="icon" @mouseenter="mouseenter(item)" @mouseleave="mouseleave(item)"
          ><i class="iconfont" :class="item.icon"></i
        ></span>
        <transition name="fade">
          <span
            v-if="item.iconOpen"
            class="dropdown-open"
            @click="iconEvent(item)"
            @mouseenter="mouseenter(item)"
            @mouseleave="mouseleave(item)"
            ><i class="iconfont" :class="item.icon"></i><span>{{ item.iconName }}</span></span
          >
        </transition>
      </div>
      <div v-else-if="item.type === 'formwork'" class="gtm-button">
        <span
          class="status"
          :class="item.icon ? 'radius-right' : 'radius-whole'"
          @click="item.icon ? '' : formworkEvent(item)"
          >{{ item.label }}</span
        >
        <span v-if="item.icon" class="icon" @mouseenter="mouseenter(item)" @mouseleave="mouseleave(item)"
          ><i class="iconfont" :class="item.icon"></i
        ></span>
        <transition name="fade">
          <span
            v-if="item.iconOpen"
            class="dropdown-open"
            @click="iconEvent(item)"
            @mouseenter="mouseenter(item)"
            @mouseleave="mouseleave(item)"
            ><i class="iconfont" :class="item.icon"></i><span>{{ item.iconName }}</span></span
          ></transition
        >
      </div>
      <div v-else class="gtm-button">
        <span
          class="status"
          :class="item.icon ? 'radius-right' : 'radius-whole'"
          @click="item.icon ? '' : commonEvent(item)"
          >{{ item.label }}</span
        >
        <span v-if="item.icon" class="icon" @mouseenter="mouseenter(item)" @mouseleave="mouseleave(item)"
          ><i class="iconfont" :class="item.icon"></i
        ></span>
        <transition name="fade">
          <span
            v-if="item.iconOpen"
            class="dropdown-open"
            @click="iconEvent(item)"
            @mouseenter="mouseenter(item)"
            @mouseleave="mouseleave(item)"
            ><i class="iconfont" :class="item.icon"></i><span>{{ item.iconName }}</span></span
          ></transition
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, toRefs, defineEmits, watch, ref, computed } from 'vue';
import { ButtonFilters } from '../types/index';
export interface ButtonFiltersProps {
  options: ButtonFilters;
}
const emits = defineEmits([
  'newChange',
  'downloadChange',
  'formworkChange',
  'uploadChange',
  'commonChange',
  'iconChange',
]);
const props = withDefaults(defineProps<ButtonFiltersProps>(), {
  options: () => [],
});
const newEvent = (item: any) => {
  // ??????
  emits('newChange', item);
};
const downloadEvent = (item: any) => {
  // ??????
  emits('downloadChange', item);
};
const formworkEvent = (item: any) => {
  // ????????????
  emits('formworkChange', item);
};
const uploadEvent = (item: any) => {
  // ??????
  emits('uploadChange', item);
};
const commonEvent = (item: any) => {
  // ??????
  emits('commonChange', item);
};
const mouseenter = (item: any) => {
  // ??????
  item.iconOpen = true;
};
const mouseleave = (item: any) => {
  // ??????
  item.iconOpen = false;
};
const iconEvent = (item: any) => {
  item.iconOpen = false;
  emits('iconChange', item);
};
const buttonData = computed<ButtonFilters>(() => {
  return props.options ? props.options : [];
});
</script>
<style lang="scss" scoped>
.table-button {
  display: flex;
}
.gtm-button {
  display: flex;
  margin-right: 20px;
  position: relative;
  .status {
    font-size: 12px;
    display: inline-block;
    min-width: 80px;
    height: 32px;
    line-height: 32px;
    font-weight: 500;
    text-align: center;
    color: #f0f9ff;
    background: #336ffd;
    cursor: pointer;
    box-sizing: border-box;
  }
  .radius-right {
    border-radius: 4px 0px 0px 4px;
  }
  .radius-whole {
    border-radius: 4px;
  }
  .icon {
    margin-left: 1px;
    text-align: center;
    line-height: 32px;
    display: inline-block;
    width: 40px;
    height: 32px;
    background: #336ffd;
    border-radius: 0px 4px 4px 0px;
    cursor: pointer;
    .iconfont {
      color: #f0f9ff;
    }
  }
  .dropdown-open {
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 37px;
    border-radius: 4px;
    position: absolute;
    top: 32px;
    text-align: center;
    line-height: 37px;
    cursor: pointer;
    font-size: 12px;
    box-shadow: 2px 2px 15px #c9cbcf;
    animation-duration: 1s;
    z-index: 99;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  // .icon:hover +.dropdown-open {
  //   display: block;
  // }
}
</style>
