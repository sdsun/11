<template>
  <div class="panel-table">
    <div class="panel-form">
      <slot name="form"></slot>
    </div>
    <div class="table-main">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: auto;
  .panel-form {
    width: 100%;
    padding: 12.5px 26.5px;
    background: rgba(255, 255, 255, 0.94);
    border-radius: 6px;
    box-sizing: border-box;
    transition: height 1s linear;
  }
  .table-main {
    height: 200px;
    width: 100%;
    padding: 12.5px 26.5px;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.94);
    border-radius: 6px;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
