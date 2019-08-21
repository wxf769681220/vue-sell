<template>
  <transition name="move">
    <div class="food" v-show="isFood" ref="scroll">
      <div class="content-wrapper">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">X</div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cart-control-wrapper">
            <cart-control :food="food"></cart-control>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count" @click.stop.prevent="addFirst($event)">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratings-select
            :ratings="ratings"
            :selectType="selectType"
            :onlyContent="onlyContent"
            :desc="desc"
            @select="eventSelect"
            @toggle="eventToggle">
          </ratings-select>
          <div class="rating-wrapper">
            <ul v-show="ratings && ratings.length">
              <!-- v-show 绑定一个表达式（可以是函数返回的结果） -->
              <li class="rating-item" v-show="needShow(rating.rateType, rating.text)" v-for="(rating,index) in ratings" :key="index">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{format(rating.rateTime)}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down':rating.rateType === 1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CartControl from 'components/cart-control/cart-control'
import Split from 'components/split/split'
import RatingsSelect from 'components/ratings-select/ratings-select'
import BScroll from 'better-scroll'
import moment from 'moment' // 日期格式化

const ALL = 2

export default {
  name: 'food',
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isFood: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  computed: {
    ratings() {
      return this.food.ratings
    }
  },
  watch: {},
  mounted() {},
  created() {
  },
  methods: {
    addFirst(event) {
      if (!event._constructed) {
        return
      }
      this.$set(this.food, 'count', 1)
    },
    eventSelect(type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    eventToggle() {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    show() {
      this.isFood = true

      // 针对data中的变量做初始化很有必要
      this.selectType = ALL
      this.onlyContent = false

      // dom已准备完毕,可以初始化scroll
      this.$nextTick(() => {
        if (!this.scroll) {
          this._initScroll()
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.isFood = false
    },
    _initScroll() {
      this.scroll = new BScroll(this.$refs.scroll, {
        click: true
      })
    }
  },
  components: {
    CartControl,
    Split,
    RatingsSelect
  }
}
</script>

<style lang="stylus" scoped>
.food
  position: fixed
  top: 0
  left: 0
  bottom: 48px
  z-index: 30
  width: 100%
  background-color: #fff
  overflow: hidden
  &.move-enter-active,
  &.move-leave-active
    transition: all 0.1s linear
  &.move-enter,
  &.move-leave-active
    transform: translate3d(100%, 0, 0)
  .content-wrapper
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        display: block
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 10px
        display: flex
        align-items: center
        justify-content: center
        width: 30px
        height: 30px
        color: #fff
        background-color: rgba(0,0,0,0.6)
        border-radius: 50%
    .content
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: #333
      .detail
        margin-bottom: 18px
        height: 10px
        line-height: 10px
        .sell-count,
        .rating
          font-size: 10px
          color: grey
        .sell-count
          margin-right: 12px
      .price
        line-height: 24px
        font-weight: 700
        .now
          margin-right: 8px
          font-size: 14px
          color: red
        .old
          text-decoration: line-through
          font-size: 12px
          color: grey
      .cart-control-wrapper
        position: absolute
        right: 18px
        bottom: 18px
      .buy
        position: absolute
        right: 18px
        top: 0
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        border-radius: 12px
        font-size: 12px
        color: #fff
        background: blue
        opacity: 1
        &.fade-enter-active,
        &.fade-leave-active
          transition: all 0.3s
        &.fade-enter,
        &.fade-leave-active
          opacity: 0
          z-index: -1
    .info
      padding: 18px
      .title
        margin-bottom: 6px
        line-height: 14px
        font-size: 14px
        color: darken
      .text
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        color: grey
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: #333
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          .user
            position: absolute
            right: 0
            top: 16px
            display: flex
            align-items: center
            line-height: 12px
            .name
              margin-right: 6px
              font-size: 12px
              color: grey
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 12px
            color: grey
          .text
            line-height: 16px
            font-size: 12px
            color: #000
            .icon-thumb_up,
            .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: blue
            .icon-thumb_down
              color: #a1a1a1
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: grey
</style>
