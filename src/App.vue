<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App'

}

</script>

<style>
html,body,#app{
  height: 100%;
  margin: 0;
  padding: 0;
}
  .el-breadcrumb{
    margin-bottom: 15px;
    font-size: 12px;
  }
  .el-table{
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
