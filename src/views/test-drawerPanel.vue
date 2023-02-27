<script setup lang="ts">
import { reactive } from "vue";
import { GDrawerPanel, GSectionGroup } from "packages";
import { GSectionContainer } from "packages/SectionContainer/index";
import useDrawer from "@/hooks/useDrawer";

const {
  loading,
  visible,
  openDrawer,
  closeDrawer,
  openLoading,
  closeLoading
} = useDrawer();
const {
  loading: loading1,
  visible: visible1,
  openDrawer: openDrawer1,
  closeDrawer: closeDrawer1
} = useDrawer();
const form = reactive({
  name: "",
  region: "",
  name1: "",
  region1: "",
  desc: "",
  desc1: "",
});
const handleOpen = () => {
  openDrawer()
  openLoading()
  setTimeout(() => {
    closeLoading()
  }, 1200)
}
const handleSubmit = () => {
  console.log("submit");
};
</script>

<template>
  <div>
    <GDrawerPanel
      v-model:visible="visible"
      title="Edit"
      :loading="loading"
      :is-edit="true"
      @update:model-value="closeDrawer"
      @submit="handleSubmit"
    >
      <GSectionContainer>
      <el-form :model="form" label-width="120px">
        <h1 :style="{ margin: '20px' }">风格1: 默认</h1>
        <GSectionGroup title="BASIC">
          <template #desc> desc this part</template>
          <el-form-item label="Activity name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-select
              v-model="form.region"
              placeholder="please select your zone"
            >
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
            <el-select
              v-model="form.region1"
              placeholder="please select your zone"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </GSectionGroup>
      </el-form>
      </GSectionContainer>
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
          <el-form-item label="Activity form :">
            Test Data
          </el-form-item>
        </GSectionGroup>
        <GSectionGroup title="CARD" type="card">
          <el-form-item label="Activity form :">
            Test Data
          </el-form-item>
        </GSectionGroup>
      </el-form>
    </GDrawerPanel>
    <el-button @click="handleOpen">Open Drawer - New</el-button>
    <el-button @click="openDrawer1">Open Drawer - Detail</el-button>
  </div>
</template>
