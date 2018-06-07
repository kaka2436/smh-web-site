<template>
  <div class="main-frames">
    <el-row class="header" type="flex" justify="space-between">
      <el-col class="logo" :xs="10" :sm="5" :md="3">
        <li class="logo-img">
          <img src="../assets/logo.png" alt="" @click="menuChange">
        </li>
      </el-col>
      <el-col class="name" :xs="9" :sm="16" :md="18"></el-col>
      <el-col class="user-info" :xs="5" :sm="3" :md="3">
        <el-dropdown class="user" trigger="click">
          <span class="el-dropdown-link btn-user">
            <i class="fa fa-user"></i> {{username}} <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="menu-item">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row class="main-body" type="flex">
      <transition name="menu-side">
        <el-col class="aside" v-show="showMenu" :xs="10" :sm="5" :md="3">
          <transition name="menu-side">
            <!--<div id="side-bar"></div>-->
            <el-menu
              default-active="1"
              :unique-opened=true
              active-text-color="#ff564d"
              class="aside-menu"
              background-color="#393532"
              text-color="#fff"
              style="border-right: none">
              <el-submenu index="router">
                <template slot="title">
                  <!--<i class="el-icon-location"></i>-->
                  <img src="../assets/router.png" alt="">
                  <span>路由</span>
                </template>
                <el-menu-item index="1" ref="list">
                  <span>路由列表</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="internet">
                <template slot="title">
                  <!--<i class="el-icon-location"></i>-->
                  <img src="../assets/router.png" alt="">
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
                  <!--<i class="el-icon-location"></i>-->
                  <img src="../assets/sys.png" alt="">
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
          </transition>
        </el-col>
      </transition>
      <el-col class="main" ref="body" :xs="14" :sm="19" :md="21">
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
  data: function () {
    const username = sessionStorage.getItem('username')
    return {
      username: username,
      showMenu: true
    }
  },
  methods: {
    menuChange: function () {
      if (this.showMenu === true) {
        this.showMenu = false
      } else {
        this.showMenu = true
      }
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
    height: 6%;
    width: 100%;
  }
  .main-body {
    height: 94%;
  }
  .aside {
    height: 100%;
    background-color: #393532;
    color: #fff;
  }
  .menu-side-enter-active {
    transition:all .5s linear;
    transform:translate3d(0,0,0);
  }
  .menu-side-enter {
    transform :translate3d(-100%,0,0);
  }
  .menu-side-leave-active{
    transition:all .5s linear;
    transform:translate3d(-100%,0,0);
  }
  .menu-side-leave{
    transform:translate3d(0,0,0);
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
    display: block;
    background-color: #e1251b;
    color: #fff;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .user-info .user .btn-user {
    width: 100%;
    height: 100%;
    background-color: #e1251b;
    color: #fff;
    text-align: center;
    display: block;
    padding-top: 8%;
  }
  .user-info .user .btn-user:hover {
    background-color: #bf1f17;
  }
  .user-info .user .btn-user:active {
    background-color: #9d1a13;
  }
  .logo .logo-img {
    width: 100%;
    height: 100%;
  }
  .logo .logo-img img {
    width: auto;
    height: 100%;
  }
  .name {
    background: url("../assets/name.png") no-repeat;
    background-size:auto 100%;
    -moz-background-size:auto  100%;
  }
  #side-bar {
    height: 100%;
    width: 2%;
    background-color: black;
    float: right;
    border: 1px solid green;
    display: float;
  }
</style>
