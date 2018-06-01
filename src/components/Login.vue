<template>
  <el-row type="flex" justify="center" class="login">
    <el-col :xs="6" :sm="6">
        <el-form :model="user" :rules="rules" ref="user" id="login-form">
          <el-form-item :label="$t('m.username')" prop="username">
            <el-input v-model="user.username" :placeholder="$t('m.usernameHold')" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('m.passwd')" prop="passwd">
            <el-input type="password" v-model="user.passwd" :placeholder="$t('m.passwdHold')" v-on:keyup.enter.native="onSubmit('user')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="onSubmit('user')">{{$t('m.login')}}</el-button>
          </el-form-item>
        </el-form>
    </el-col>
  </el-row>
</template>

<script>
import crypto from 'crypto'
import server from '../../static/common'
export default {
  name: 'login',
  data: function () {
    return {
      user: {
        username: '',
        passwd: ''
      },
      rules: {
        username: [
          {required: true, message: this.$t('m.usernameWarn'), trigger: 'blur'}
        ],
        passwd: [
          {required: true, message: this.$t('m.passwdWarn'), trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        } else {
          var userInfo = this.user
          var md5 = crypto.createHash('md5')
          md5.update(userInfo.passwd)
          userInfo.passwd = md5.digest('hex')
          var str = JSON.stringify(userInfo)
          this.$ajax({
            method: 'post',
            url: 'https://' + server.hostname + ':' + server.port + '/user/login',
            data: str
          }).then(function (e, r, s) {
            console.log(s)
          })
        }
      })
    }
  }
}
</script>

<style>
  .login{
    border: 1px solid red;
    vertical-align: center;
  }

</style>
