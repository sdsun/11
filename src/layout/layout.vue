<template>
  <el-container class="layout-container">
    <el-header class="app-header">NPM PUBLISH TEST</el-header>
    <el-container class="app-wrapper">
      <el-aside width="200px" class="app-aside">
        <el-scrollbar>
          <el-menu>
            <el-menu-item
              :default-active="$route.path"
              :index="route.path"
              v-for="route in AutoCreateRoutesWithoutComponent"
              :key="route.path"
            >
              <router-link :to="route">{{ route.meta?.pageTitle }}</router-link>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="app-main">
        <el-scrollbar><router-view></router-view></el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { AutoCreateRoutesWithoutComponent } from '../router/auto-create-routes';
</script>

<style scoped lang="scss">
.layout-container {
  height: 100%;
}
.app-wrapper {
  overflow: hidden;
}
.app-header {
  color: #fff;
  font-size: 30px;
  background-color: var(--el-color-primary);
  line-height: var(--el-header-height);
}
.app-aside {
  background-color: #f1f1f1;
}
.app-main {
  background: #f9f9f9;
}
</style>
