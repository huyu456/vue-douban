<template>
  <div class="modify">
    <v_header :title="title" :header_type="true">
      <div class="back" @click="hideCurrentPage">
        <span class="iconfont back-icon">&#xe62e;</span>
      </div>
      <p slot="save" class="save" @click="saveData">保存</p>
    </v_header>
    <div class="form">
      <div class="text">
        <input type="text" v-model="val"/>
        <div class="empty">
          <span class="iconfont" @click="emptyValue">&#xe7b7;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commentHeader from '../../base/commentHeader/commentHeader'
export default {
  name: 'modifyForm',
  props: {
    title: {
      type: String
    },
    form_type: {
      type: String
    },
    input_value: {
      type: String
    }
  },
  data () {
    return {
      val: this.input_value
    }
  },
  components: {
    v_header: commentHeader
  },
  methods: {
    hideCurrentPage () {
      this.$emit('hidePage', false)
    },
    emptyValue () {
      this.val = ''
    },
    saveData () {
      if (this.val) {
        const data = {}
        data[this.form_type] = this.val
        this.$http.patch('/api/users/info/', data).then(ret => {
          if (ret.data.error_code === 10006) {
            console.log(ret.data.msg)
            alert(ret.data.msg)
            this.val = this.input_value
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  },
  watch: {
    input_value (new_val, old_val) {
      this.val = new_val
    }
  }
}
</script>

<style lang="stylus" scoped>
  .modify
    position: absolute
    background: #cacaca
    left: 0
    right: 0
    bottom: 0
    top: 0
    .save
      width: 1rem;
      height: 1rem;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 0.28rem;
      line-height: 1rem;
      text-align: center;
    .form
      margin-top: 1.2rem
      background: #ffffff
      .text
        height: .6rem
        display: flex;
        padding: .1rem
        input
          flex: 1
        .empty
          flex: .6rem 0 0
          line-height: .6rem
          height: .6rem
          text-align: center
          .iconfont
            color: #cacaca
</style>
