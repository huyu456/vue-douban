<template>
  <div class="userInfo">
    <v_header :title="'我的资料'"></v_header>
    <div class="wrapper">
      <ul>
        <li v-for="(item, index) in items" :key="index" @click="modifyFormClick(item.text, item.field, item.result)">
          <span class="iconfont" v-html="item.icon"></span>
          <span class="desc">{{item.text}}</span>
          <span class="iconfont right">&#xe638;</span>
          <span class="user-icon">
            <img :src="item.result" v-if="item.isImg">
            <span v-else v-text="checkGender(item.result, item.field)"></span>
          </span>
        </li>
      </ul>
    </div>
    <modify-form :title="title" v-show="show_page" @hidePage="hidePage" :form_type="form_type"
                 :input_value="input_value"></modify-form>
  </div>
</template>

<script>
import commentHeader from '../../base/commentHeader/commentHeader'
import modifyForm from '../../base/modifyForm/modifyForm'

export default {
  name: 'userInfo',
  components: {
    v_header: commentHeader,
    modifyForm: modifyForm
  },
  data () {
    return {
      items: [{
        field: 'profile_photo',
        icon: '&#xe634;',
        text: '头像',
        isImg: true
      }, {
        field: 'username',
        icon: '&#xe6c3;',
        text: '昵称',
        isImg: false
      }, {
        field: 'gender',
        icon: '&#xe698;',
        text: '性别',
        isImg: false
      }, {
        field: 'birthday',
        icon: '&#xe617;',
        text: '出生日期',
        isImg: false
      },
      {
        field: 'email',
        icon: '&#xe71f;',
        text: '邮箱',
        isImg: false
      }],
      title: '',
      show_page: false,
      form_type: '',
      input_value: ''
    }
  },
  methods: {
    userDetail () {
      this.$http.get('/api/users/info/')
        .then(ret => {
          const data = ret.data
          const arr = []
          for (const i of this.items) {
            i.result = data[i.field]
            arr.push(i)
          }
          this.items = arr
        }).catch(error => {
          console.log(error)
        })
    },
    modifyFormClick (val, form_type, result) {
      this.show_page = true
      this.title = val
      this.input_value = result
      this.form_type = form_type
    },
    hidePage (val) {
      this.show_page = val
    },
    checkGender (val, field) {
      if (field === 'gender') {
        return val === 'male' ? '男' : '女'
      }
      return val
    }
  },
  mounted () {
    this.userDetail()
  }
}
</script>

<style lang="stylus" scoped>
  .userInfo
    position: fixed;
    left:0
    top: 0
    right: 0
    bottom: 0
    background: #ffffff
    .wrapper
      z-index: 999
      padding-top: 1rem
      box-sizing: border-box
      ul
        li
          height: .6rem
          border-bottom: 1px solid #cacaca
          padding: .1rem
          line-height: .6rem
          .desc
            font-size: .28rem
            margin-left: .2rem
          .right
            float: right;
            margin: 0 .2rem;
            display: inline-block;
          .user-icon
            float: right
            img
              width: .6rem
              height: .6rem
              border-radius: 50%
              overflow: hidden;
</style>
