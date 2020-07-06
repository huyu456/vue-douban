<template>
  <div class="login">
    <div class="main">
      <h1 class="title">登录豆瓣视频</h1>
      <div class="form">
        <div class="wrapper" v-if="!isPwd">
          <div class="email">
            <input placeholder="邮箱" type="email" v-model="email" maxlength="25">
            <span class="iconfont close"
                  @click="cleanValueClick('email')"
                  v-show="email.length > 0">&#xe7b7;</span>
          </div>
          <div class="error">{{error_info}}</div>
          <div class="code">
            <div class="code-data">
              <input placeholder="请输入验证码" v-model="code" type="text" maxlength="6">
              <span class="iconfont close extra"
                    @click="cleanValueClick('code')"
                    v-show="code.length > 0">&#xe7b7;</span>
            </div>
            <div class="code-text">
              <span @click="send_code" :class="resend ? '' : 'noclick'"
                    class="send_code" v-text="resend ? '发送验证码' : text"></span>
            </div>
          </div>
          <div class="error">{{code_error_info}}</div>
        </div>
        <div class="wrapper" v-else>
          <div class="username">
            <input placeholder="邮箱" v-model="email" type="email" maxlength="25">
            <span class="iconfont close"
                  @click="cleanValueClick('email')"
                  v-show="email.length > 0">&#xe7b7;</span>
          </div>
          <div class="error">{{error_info}}</div>
          <div class="pwd">
            <div class="pwd-data">
              <input placeholder="请输入密码" v-model="pwd"
                     type="password"
                     onkeyup="value=value.replace(/[\u4E00-\u9FA5]/g,'')"
                     onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\u4E00-\u9FA5]/g,''))"
                     maxlength="15">
              <span class="iconfont close extra"
                    @click="cleanValueClick('pwd')"
                    v-show="pwd.length > 0">&#xe7b7;</span>
            </div>
            <div class="pwd-text">
              找回密码
            </div>
          </div>
          <div class="error">{{pwd_error_info}}</div>
        </div>
        <button ref="submit" @click="submit" :disabled="disabled">进入豆瓣电影</button>
        <div style="display: none">{{exitsVal}}</div>
      </div>
      <div class="change-login-way">
        <span v-if="!isPwd" @click="changeClick">密码登录</span>
        <span v-else @click="changeClick">邮箱登录</span>
      </div>
      <div class="register">
        <span @click="registerClick">注册</span>
      </div>
      <!--弹出提示-->
    </div>
    <span class="iconfont close-page" @click="closePage">&#xe784;</span>
  </div>
</template>

<script>
import { send_code } from 'api/user'

export default {
  name: 'login',
  data () {
    return {
      isPwd: false,
      disabled: true,
      email: '',
      code: '',
      pwd: '',
      resend: true,
      text: '',
      error_info: '',
      code_error_info: '',
      pwd_error_info: '',
      input_values: 0
    }
  },
  methods: {
    changeClick () {
      this.isPwd = !this.isPwd
      this.email = this.code = this.pwd = ''
      this.error_info = ''
    },
    registerClick () {
      this.$router.push({
        path: '/user/register'
      })
    },
    submit () {
      const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (reg.test(this.email)) {
        this.$http.post('/api/token/', {
          username: this.email,
          code: this.code,
          password: this.pwd || this.$md5('*gf5f#-=f*g+r.%$90?fds')
        })
          .then(ret => {
            const data = ret.data
            if (data.error_code === 10001 || data.error_code === 10002) {
              this.code_error_info = ret.data.msg
              return
            } else if (data.error_code === 10003) {
              this.pwd_error_info = ret.data.msg
              return
            } else if (data.error_code === 10004) {
              this.error_info = ret.data.msg
              return
            }
            this.$cookie.set('token', data.access, { expires: '60m' })
            this.$cookie.set('refresh', data.refresh, { expires: '1D' })
            this.$router.push({
              path: '/user/'
            })
          }).catch(error => {
            console.log(error)
          })
      } else {
        this.error_info = '邮箱错误'
      }
    },
    closePage () {
      this.$router.push({
        path: '/user/'
      })
    },
    send_code () {
      const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      this.text = '重新发送(60s)'
      let count = 60
      if (this.email !== '') {
        if (reg.test(this.email)) {
          send_code(this.email, 'login').then((ret) => {
            this.resend = false
            const time = setInterval(() => {
              count -= 1
              this.text = '重新发送(' + count + 's)'
              if (count === 0 || this.isPwd) {
                clearInterval(time)
                this.resend = true
                this.text = '重新发送'
              }
            }, 1000)
            if (ret.status === 201) {
              console.log('验证码发送成功')
            }
          }).catch(error => {
            if (error.response.status === 400) {
              this.error_info = error.response.data.msg
            }
          })
        } else {
          this.error_info = '邮箱格式不正确'
        }
      } else {
        this.error_info = '邮箱不可为空'
      }
    },
    cleanValueClick (val) {
      if (val === 'email') {
        this.email = this.error_info = ''
      } else if (val === 'pwd') {
        this.pwd = this.pwd_error_info = ''
      } else {
        this.code = this.code_error_info = ''
      }
    }
  },
  computed: {
    exitsVal: function () {
      if (this.isPwd) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.input_values = Number(Boolean(this.email) + Boolean(this.pwd))
      } else {
        if (this.code.length === 6) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.input_values = Number(Boolean(this.email) + Boolean(this.code))
        }
      }
      return this.input_values
    }
  },
  watch: {
    input_values (new_value, old_value) {
      if (new_value === 2) {
        this.$refs.submit.style.background = 'green'
        this.disabled = false
        return
      }
      this.disabled = true
      this.$refs.submit.style = ''
    },
    code (new_value, old_value) {
      if (/\d+/.test(new_value) === false) {
        this.code = ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login
    position: fixed;
    bottom:0
    top:0
    left:0
    right:0
    background: #ffffff
    .close-page
      position: absolute
      top: .3rem;
      right: .3rem
      font-size: .36rem
    .main
      padding:.4rem
      margin-top: .6rem
      .title
        font-size: .44rem
        font-weight: bold
      .form
        .close
          position: absolute;
          right: 0;
          top: 30px;
          line-height: .6rem;
          color: #cacaca
        .extra
          right: 1.6rem
        input
          height: .6rem
          width: 100%
          &::-webkit-input-placeholder
            font-family: alifont
        .email, .code, .username, .pwd
          border-bottom: 1px solid #cacaca
          height: .6rem
          padding-top: .6rem
          position: relative;
        .error
          color: red;
          font-size: .24rem;
          padding-top: .2rem;
        .code, .pwd
          display: flex
          position: relative;
          .code-data, .pwd-data
            flex: 1
          .code-text, .pwd-text
            flex: 1.6rem 0 0
            color: #333333
            font-size: .24rem
            padding-left: .1rem
            line-height: .6rem;
            .send_code
              word-break:keep-all;
              white-space:nowrap;
            .noclick
              pointer-events: none
            &::before
              content: '|'
              font-size: .3rem
              color: #cacaca
              padding-right: .1rem
        button
          padding: .2rem;
          width: 100%;
          margin-top: .3rem
          border-radius: .1rem
          color: #ffffff
      .change-login-way
        text-align: center;
        margin-top: .8rem;
        color: #333333
      .register
        position: absolute;
        bottom: .3rem
        left: 50%
        transform: translateX(-50%);
        font-size: .28rem
</style>
