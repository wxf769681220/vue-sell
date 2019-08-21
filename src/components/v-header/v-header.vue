<template>
  <header class="v-header" @click="showDetail" style="display: block">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <support-ico :size=1 :type="seller.supports[0].type"></support-ico>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right">></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

    <!-- 详情 -->
    <header-detail ref="headerDetail" :seller="seller"></header-detail>
  </header>
</template>

<script>
import SupportIco from 'components/support-ico/support-ico'
import HeaderDetail from 'components/header-detail/header-detail'

export default {
  name: 'v-header',
  props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      num: 0
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    // console.log(this.seller)
  },
  methods: {
    showDetail() {
      this.$refs.headerDetail.show()
    }
  },
  components: {
    SupportIco,
    HeaderDetail
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin"

.v-header
  position: relative
  color: #fff
  background-color: rgba(7, 17, 27, 0.5)
  overflow: hidden
  .content-wrapper
    position: relative
    display: flex
    align-items: center
    padding: 24px 12px 18px 24px
    .avatar
      flex: 0 0 64px
      width: 64px
      img
        display: block
        border-radius: 2px
    .content
      flex: 1 1 auto
      margin-left: 16px
      .title
        display: flex
        align-items: center
        margin-bottom: 8px
        .brand
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          font-weight: bold
      .description
        margin-bottom: 8px
        font-size: 12px
        line-height: 12px
      .support
        display: flex
        align-items: center
        .support-ico
          margin-right: 4px
        .text
          font-size: 12px
          line-height: 12px
    .support-count
      position: absolute
      right: 12px
      bottom: 14px
      display: flex
      align-items: center
      padding: 0 8px
      height: 24px
      line-height: 24px
      text-align: center
      background: rgba(7, 17, 27, 0.2)
      border-radius: 14px
      .count
        font-size: 12PX
      .icon-keyboard_arrow_right
        margin-left: 2px
        font-size: 10px
        line-height: 24px
  .bulletin-wrapper
    position: relative
    display: flex
    align-items: center
    padding: 0 8px
    height: 28px
    line-height: 28px
    background-color: rgba(7, 17, 27, 0.2)
    .bulletin-title
      flex: 0 0 22px
      margin-right: 4px
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
    .bulletin-text
      flex: 1 1 auto
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      font-size: 12px
    .icon-keyboard_arrow_right
      flex: 0 0 10px
      width: 10px
      font-size: 12px
  .background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
</style>
