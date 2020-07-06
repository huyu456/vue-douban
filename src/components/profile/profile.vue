<template>
  <div class="profile">
    <slot></slot>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :data="[profile_info]">
        <div class="celebrity-info">
          <h1 class="name">{{profile_info.name}}</h1>
          <h2 class="name-en">{{profile_info.name_en}}</h2>
          <div class="info-lists">
            <div class="gender">
              <span class="item">性别:</span>
              <span>{{profile_info.gender}}</span>
            </div>
            <div class="constellation">
              <span class="item">星座:</span>
              <span v-text="get_profile"></span>
            </div>
            <div class="birthday">
              <span class="item">出生日期:</span>
              <span>{{profile_info.birthday}}</span>
            </div>
            <div class="born-place">
              <span class="item">出生地:</span>
              <span>{{profile_info.born_place}}</span>
            </div>
            <div class="more-name">
              <span class="item">更多中文名:</span>
              <span>{{moreAka}}</span>
            </div>
          </div>
          <p class="summary" v-html="profile_info.summary"></p>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  props: {
    profile_info: {
      type: Object
    }
  },
  computed: {
    get_profile () {
      return this.profile_info.constellation === '' ? '暂无信息' : this.profile_info.constellation
    },
    moreAka () {
      const aka = this.profile_info.aka
      if (aka) {
        return aka.join('/')
      }
      return '暂无信息'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .profile
    position: fixed;
    left:0
    right:0
    bottom:0
    top:0
    z-index: 101
    background: #ffffff
    .header
      position: fixed;
      top: 0;
      width: 100%;
      height: 1rem;
      z-index: 100;
      text-align: center;
      background-color: #fff;
      color: #333;
      border-bottom: 1px solid #cacaca
      .close
        position: absolute;
        width: 1rem;
        height: 1rem;
        left: 0;
        top: 0;
        &>span
          line-height: 1rem;
          text-align: center;
          font-size: 0.36rem;
          display: block;
      .title
        line-height:1rem
    .scroll-list-wrap
      height:100%
      overflow: hidden;
      .celebrity-info
        padding: 50px 20px 10px 20px;
        color: #333;
        .name
          margin-top: .6rem;
          font-size: .36rem;
          font-weight: 600;
        .name-en
          margin-top: .2rem;
          font-size: .24rem;
        .info-lists
          padding: .4rem 0;
          font-size: .28rem;
          .gender, .constellation, .birthday, .born-place, .more-name
            line-height: 25px;
            .item
              display: inline-block;
              width: 80px;
        .summary
          font-size: 14px;
          line-height: 22px;
</style>
