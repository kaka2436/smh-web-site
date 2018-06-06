<template>
  <div class="main-frames">
    <el-row class="header" type="flex" justify="space-between">
      <el-col class="logo" :xs="10" :sm="5" :md="3"></el-col>
      <el-col class="name" :xs="9" :sm="16" :md="18"></el-col>
      <el-col class="user-info" :xs="5" :sm="3" :md="3" style="border:1px solid green">
        <el-dropdown>
          <el-button type="primary" class="user">
            <i class="fa fa-user"></i>USERNAME<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row class="main-body" type="flex">
      <el-col class="aside" :xs="10" :sm="5" :md="3">
        <el-menu
          default-active="1"
          class="aside-menu"
          unique-opened=true
          background-color="#393532"
          text-color="#fff"
          style="border-right: none"
          active-text-color="#ffd04b">
          <el-submenu index="router">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>路由</span>
            </template>
            <el-menu-item index="1" @click="menuChange" ref="list">
              <span>路由列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="internet">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>网络</span>
            </template>
            <el-menu-item index="2">
              <span>网络设置</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span>连接测试</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="system">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统</span>
            </template>
            <el-menu-item index="4">
              <span>系统状态</span>
            </el-menu-item>
            <el-menu-item index="5">
              <span>Log</span>
            </el-menu-item>
            <el-menu-item index="6">
              <span>License</span>
            </el-menu-item>
            <el-menu-item index="7">
              <span>版本信息</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col class="main" :xs="14" :sm="19" :md="21">
        <el-row class="main-container">
          <router-view/>
        </el-row>
        <el-row class="footer"></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import server from '../../static/common'
import axios from 'axios'
export default {
  name: 'Home',
  methods: {
    menuChange: function () {
    },
    test: function () {
      axios.get('https://' + server.hostname + ':' + server.port + '/route/list?key=' + sessionStorage.getItem('api')).then(res => {
        console.log(res)
      })
    }
  }
}

</script>

<style>
  .main-frames {
    height: 100%;
    font-size: 1em;
  }
  .header {
    background-color: #e1251b;
    height: 8%;
    width: 100%;
  }
  .main-body {
    height: 92%;
  }
  .aside {
    height: 100%;
    background-color: #393532;
    color: #fff;
  }
  .main-container {
    height: 97%;
    background-color: #f5f5f5;
  }
  .footer {
    height: 3%;
    background: #dddddd url("../assets/copyright.png") no-repeat center center;
    background-size: auto 100%;
  }
  .user-info {
    height: 100%;
  }
  .user-info .user {
    height: 100%;
    width: 100%;
  }
  .logo{
    background: url("../assets/logo.png") no-repeat;
    background-size:auto 100%;
    -moz-background-size:auto 100%;
  }
  .name {
    background: url("../assets/mame.png") no-repeat;
    background-size:auto 100%;
    -moz-background-size:auto  100%;
  }
</style>
