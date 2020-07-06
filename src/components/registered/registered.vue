<template>
  <div class="register">
    <div class="main">
      <h1 class="title">用户注册</h1>
      <div class="form">
        <cube-input v-model="username"
                    placeholder="请输入用户名"
                    :clearable="clearable"
                    :maxlength="30"
                    type="text"></cube-input>
        <cube-validator v-model="result[0]" :model="username" ref="validator0"
                        :rules="username_rules" :messages="messages"></cube-validator>
        <cube-input v-model="password"
                    :clearable="clearable"
                    placeholder="请输入密码"
                    :maxlength="16"
                    @input="pwdChange"
                    :eye="eye"
                    type="password"></cube-input>
        <cube-validator v-model="result[1]" :model="password" ref="validator1"
                        :rules="rules" :messages="messages"></cube-validator>
        <cube-input v-model="password2"
                    :clearable="clearable"
                    placeholder="请再次输入密码"
                    :maxlength="16"
                    @input="pwdChange"
                    :eye="eye"
                    type="password"></cube-input>
        <div class="validator">{{error}}</div>
        <cube-validator v-model="result[2]" :model="password2" ref="validator2"
                        :rules="rules" :messages="messages"></cube-validator>
        <cube-input v-model="email"
                    placeholder="请输入邮箱"
                    :clearable="clearable"
                    type="email"></cube-input>
        <cube-validator v-model="result[3]" :model="email" :rules="email_rules" ref="validator3"></cube-validator>
        <div class="captcha">
          <cube-input v-model="code" placeholder="请输入验证码" class="captcha-input" :maxlength="6"></cube-input>
          <div class="send-code">
            <span :class="resend ? '' : 'noclick'" @click="send_reg_code"
                  class="send_code" v-text="resend ? '发送验证码' : text"></span>
          </div>
        </div>
        <cube-validator v-model="result[4]" :model="code" :rules="code_rules" ref="validator4"></cube-validator>
        <cube-button type="submit" @click="submit">提交</cube-button>
        <cube-popup type="code-error" :mask="false" ref="codeError">
          {{error_text}}
        </cube-popup>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { send_code } from '../../api/user'

export default {
  name: 'registered',
  data () {
    return {
      username: '',
      password: '',
      password2: '',
      email: '',
      code: '',
      result: [undefined, undefined, undefined, undefined, undefined],
      valid: undefined,
      error: '',
      username_rules: {
        required: true,
        type: 'text'
      },
      rules: {
        required: true,
        type: 'password',
        pattern: /^[0-9a-zA-Z]+$/,
        custom: (val) => {
          return val.length >= 6
        }
      },
      email_rules: {
        required: true,
        type: 'email',
        pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      },
      code_rules: {
        required: true,
        type: 'text',
        pattern: /^\d{6}$/
      },
      messages: {
        pattern: '不允许输入特殊字符',
        custom: '密码最少需要6位'
      },
      clearable: {
        visible: true,
        blurHidden: true
      },
      eye: {
        open: true,
        reverse: false
      },
      error_text: '', // 错误时显示的文本
      resend: true, // 验证码发送后按钮的状态
      text: '' // 验证码发送后显示的文本
    }
  },
  methods: {
    showPopup (detail) {
      const component = this.$refs.codeError
      this.error_text = detail
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    },
    submit () {
      const p1 = this.$refs.validator0.validate()
      const p2 = this.$refs.validator1.validate()
      const p3 = this.$refs.validator2.validate()
      const p4 = this.$refs.validator3.validate()
      const p5 = this.$refs.validator4.validate()
      Promise.all([p1, p2, p3, p4, p5]).then(() => {
        if (this.result.every(item => item)) {
          if (this.password.length < 6) {
          }
          if (this.password !== this.password2) {
            this.error = '两次密码不一致'
          } else {
            this.$http.post('/api/users/', {
              username: this.username,
              email: this.email,
              password: this.password,
              code: this.code
            })
              .then(ret => {
                const data = ret.data
                console.log(data)
                if (data.error_code === 20003) {
                  this.showPopup(data.msg)
                } else if (data.email === this.email) {
                  this.showPopup('注册成功') // 注册成功，跳转到登录页
                  setTimeout(() => {
                    this.$router.push({
                      path: '/user/login'
                    })
                  }, 2000)
                }
              })
          }
        }
      })
    },
    pwdChange () {
      this.error = ''
    },
    send_reg_code () {
      const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      this.text = '重新发送(60s)'
      // let count = 60
      if (this.email !== '') {
        if (reg.test(this.email)) {
          console.log('123')
          send_code(this.email, 'register').then((ret) => {
            const data = ret.data
            const error_code = data.error_code
            const detail = data.msg
            // 状态码20001，显示已注册
            // 20000，显示验证码发送成功
            let count = 60
            if (data.email_type === 'register') {
              console.log('验证码发送成功...')
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
            } else if (error_code === 20001) {
              this.showPopup(detail)
            }
          })
        }
      } else {
        const p4 = this.$refs.validator3.validate()
        p4.required = true
        console.log('输入邮箱')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .register>>>.cube-validator
    margin-top: .1rem;
    margin-left: .1rem;
    .cube-validator-msg-def
      font-size: .24rem
  .register>>>.cube-popup-content
    padding: .4rem
    color: #fff;
    background-color: rgba(0,0,0,.8);
    border-radius: .1rem
  .register
    position: fixed;
    left: 0
    right: 0
    top: 0
    bottom: 0
    padding: .2rem
    background: #ffffff
    .main
      padding:.4rem
      margin-top: .6rem
      .title
        font-size: .44rem
        font-weight: bold
      .form
        .captcha
          display: flex
          .captcha-input
            flex: 1
          .send-code
            flex: 1.6rem 0 0
            height: .8rem;
            margin-top: 0.3rem;
            text-align: center
            line-height: .8rem
            font-size: .24rem
            .noclick
              pointer-events: none
        .cube-input
          margin-top: .3rem
        .validator
          font-size: .24rem
          color: #e64340
          margin-top: .1rem;
          margin-left: .1rem;
      .cube-btn
        padding: .2rem .2rem
        margin-top: .2rem
</style>
