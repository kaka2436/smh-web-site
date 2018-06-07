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
import axios from 'axios'

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
    showLoad: function () {
      const loading = this.$loading({
        lock: true,
        text: this.$t('m.onLogin'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return loading
    },
    showFailed: function (msg) {
      this.$alert(msg, '登录失败', {
        confirmButtonText: '确定',
        type: 'error',
        center: true,
        callback: action => {
          this.user.passwd = ''
        }
      })
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        } else {
          const loading = this.showLoad()
          var userInfo = this.user
          var md5 = crypto.createHash('md5')
          md5.update(userInfo.passwd)
          userInfo.passwd = md5.digest('hex')
          var str = JSON.stringify(userInfo)
          axios.post('https://' + server.hostname + ':' + server.port + '/user/login', str).then(res => {
            if (res.data.states === 'success') {
              server.auth = res.data.message.auth
              sessionStorage.setItem('auth', server.auth)
              sessionStorage.setItem('api', res.data.message.api)
              sessionStorage.setItem('username', this.user.username.toLocaleUpperCase())
              this.$router.push('/')
              setTimeout(() => {
                loading.close()
              }, 500)
            } else if (res.data.states === 'failed') {
              loading.close()
              if (res.data.message.code === 100) {
                this.showFailed(this.$t('m.userError'))
              } else if (res.data.message.code === 200) {
                this.showFailed(this.$t('m.requestError'))
              }
            }
          }).catch(e => {
            loading.close()
            this.showFailed(this.$t('m.requestError'))
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
