<template>
  <div id="route-list">
    <el-row id="route-header" type="flex" justify="space-between">
      <el-col :xs="8" :sm="5" :md="5">
        <div id="route-title">
          <span>路由列表</span>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8">
        <div id="route-num">
          <span>路由数量:12</span>
        </div>
        <span>分页显示：</span>
        <div id="page-select">
          <el-select placeholder="请选择" size="mini">
            <el-option :key="5" label="5" value=5></el-option>
            <el-option :key="10" label="10" value=10></el-option>
            <el-option :key="15" label="15" value=15></el-option>
            <el-option :key="20" label="20" value=20></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <hr/>
    <el-row class="table">

    </el-row>
    <el-row></el-row>
  </div>
</template>

<script>
export default {
  name: 'RouterList',
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>
  #route-list {
    margin-left: 20px;
  }
  #route-header {
    margin-top: 20px;
  }
  #route-title {
    display: inline-block;
    font-size: 18px;
  }
  #route-num{
    display: inline-block;
    margin-right: 10px;
  }
  #page-select {
    width: 100px;
    display: inline-block;
    padding-left: 5px;
  }
  div hr {
    border: none;
    border-top: 1px solid #8c939d;
  }
</style>
