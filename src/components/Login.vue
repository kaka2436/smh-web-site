<template>
  <!--<div class="login">-->
    <!--<div id="login-div">-->
  <el-row type="flex" justify="center">
    <el-col :xs="22" :sm="10" :md="10" class="form-col">
      <el-form :model="user" :rules="rules" ref="user" id="login-form" label-width="80px">
        <span id="login-from-head">LOGIN</span>
        <el-form-item :label="$t('m.username')" prop="username">
          <el-input v-model="user.username" :placeholder="$t('m.usernameHold')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.passwd')" prop="passwd">
          <el-input type="password" v-model="user.passwd" :placeholder="$t('m.passwdHold')" v-on:keyup.enter.native="onSubmit('user')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="onSubmit('user')">{{$t('m.login')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" size="mini" @click="changeToChinese">中文</el-button>
          <el-button type="info" size="mini" @click="changeToEnglish">English</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
    <!--</div>-->
  <!--</div>-->
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
    changeToEnglish: function () {
      this.$i18n.locale = 'en'
      localStorage.setItem('language', 'en')
    },
    changeToChinese: function () {
      this.$i18n.locale = 'zh'
      localStorage.setItem('language', 'zh')
    },
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
      this.$alert(msg, this.$t('m.loginErr'), {
        confirmButtonText: this.$t('m.btnOk'),
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
          loading.close()
          axios.post('https://' + server.hostname + ':' + server.port + '/user/login', str).then(res => {
            if (res.data.states === 'success') {
              server.auth = res.data.message.auth
              sessionStorage.setItem('auth', server.auth)
              sessionStorage.setItem('api', res.data.message.api)
              sessionStorage.setItem('username', this.user.username.toLocaleUpperCase())
              this.$router.push('/home/routerlist')
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
  },
  beforeMount: function () {
    const language = localStorage.getItem('language') || this.$i18n.locale
    this.$i18n.locale = language
    localStorage.setItem('language', language)
  }
}

</script>

<style>
  .form-col {
    margin-top: 10%;
    box-shadow: 10px 10px 10px #888;
    background-color: #e1251b;
    border: 1px solid #e5e5e5;
  }
  #login-from-head {
    color: dimgray;
    font-size: 2rem;
    display: block;
    margin-bottom: 10px;
  }
  #login-form {
    width: 70%;
    margin-right: 0;
    background-color: #f5f5f5;
    padding: 10px;
    float: right;
  }
</style>
