<template>
  <div class="panel-table">
    <div class="panel-form">
      <slot name="form"></slot>
    </div>
    <div class="table-main">
      <div class="panel-btns">
        <div class="btn-operation">
          <slot name="operation"></slot>
        </div>
        <div class="btn-control">
          <slot name="control"> </slot>
        </div>
      </div>
      <div class="panel-table-main">
        <slot name="table"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
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
    display: flex;
    flex-direction: column;
    flex: 1;
    .panel-btns {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .btn-operation {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
      }
      .btn-control {
        display: inline-flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
    .panel-table-main {
      height: 200px;
      flex: 1;
      margin-top: 16px;
    }
  }
}
</style>
