<template>
  <transition name="move">
    <div class="header-detail" v-show="visible" @click.stop.prevent>
      <div class="detail-wrapper clearfix">
        <div class="content">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports" :key="item.id">
              <support-ico :size=2 :type="seller.supports[index].type"></support-ico>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hide">
        <div class="btn-close">close</div>
      </div>
    </div>
  </transition>
</template>

<script>
import Star from 'components/star/star'
import SupportIco from 'components/support-ico/support-ico'

export default {
  name: 'header-detail',
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
      visible: false
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  },
  components: {
    Star,
    SupportIco
  }
}
</script>

<style lang="stylus" scoped>
.header-detail
  position: fixed
  z-index: 100
  top: 0
  right: 0
  bottom: 0
  left: 0
  color: #fff
  background-color: rgba(7, 17, 27, 0.8)
  backdrop-filter: blur(10px) //ios
  overflow: auto
  &.move-enter-active,
  &.move-leave-active
    transition: all 0.1s linear
  &.move-enter,
  &.move-leave-active
    transform: translate3d(100%, 0, 0)
  .detail-wrapper
    display: inline-block
    width: 100%
    min-height: 100%
    .content
      margin-top: 60px
      padding-bottom: 60px
      .name
        font-size: 16px
        font-weight: 700
        line-height: 16px
        text-align: center
      .star-wrapper
        margin-top: 18px
        padding: 2px 0
        text-align: center
      .title
        display: flex
        margin: 28px auto 24px auto
        width: 80%
        .line
          flex: 1 1 auto
          position: relative
          top: -6px
          border-bottom: 1px solid rgba(255, 255, 255, 0.2)
        .text
          padding: 0 12px
          font-size: $fontsize-medium
          font-weight: 700
      .supports
        margin: 0 auto
        width: 80%
        .support-item
          display: flex
          align-items: center
          margin-bottom: 12px
          padding: 0 12px
          &:last-child
            margin-bottom: 0
          .support-ico
            margin-right: 6px
          .text
            font-size: 12px
            line-height: 16px
      .bulletin
        margin: 0 auto
        width: 80%
        .content
          padding: 0 12px
          font-size: 12px
          line-height: 24px
  .detail-close
    position: relative
    margin: -60px auto 0
    width: 40px
    height: 40px
    line-height: 40px
    text-align: center
    border: 1px solid #fff
    clear: both
</style>
