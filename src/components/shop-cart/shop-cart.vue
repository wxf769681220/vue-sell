<template>
  <div class="shop-cart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper" :class="{'highlight': totalCount > 0}">cart
          <div class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <!-- 购物车商品列表-->
    <transition name="move">
      <div class="shop-cart-list" v-show="isShopCartList">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cart-control-wrapper">
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 遮罩层-->
    <transition name="fade">
      <div class="background" v-show="isShopCartList" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
import CartControl from 'components/cart-control/cart-control'
import BScroll from 'better-scroll'

export default {
  name: 'shop-cart',
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isShopCartList: false,
      fold: true
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  watch: {
    'totalCount'(count) {
      if (!count) {
        this.fold = true
        this.isShopCartList = false
      }
    }
  },
  mounted() {},
  created() {},
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return
      }

      // 折叠状态
      if (!this.fold) {
        this.fold = true
        this.isShopCartList = !this.fold
        return
      }
      // 展开状态
      this.fold = !this.fold
      this.isShopCartList = !this.fold

      // 展开状态时初始化scroll
      if (this.isShopCartList) {
        this.$nextTick(() => {
          if (!this.listScroll) {
            this._initScroll()
          } else {
            this.listScroll.refresh()
          }
        })
      }
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideList() {
      this.fold = true
      this.isShopCartList = false
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert(`需要支付${this.totalPrice}元`)
    },
    _initScroll() {
      this.listScroll = new BScroll(this.$refs.listContent, {
        click: true
      })
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus" scoped>
.shop-cart
  position: relative
  height: 100%
  .content
    display: flex
    font-size: 0
    color: #999
    .content-left
      flex: 1 1 auto
      display: flex
      align-items: center
      background-color: rgb(27,33,43)
      .logo-wrapper
        position: relative
        display: flex
        align-items: center
        justify-content: center
        margin: -16px 12px 0 12px
        width: 56px
        height: 56px
        font-size: 14px
        font-weight: 700
        background-color: rgb(47,55,63)
        border: 5px solid rgb(27,33,43)
        border-radius: 50%
        &.highlight
          color: #fff
          background-color: rgb(0,160,220)
        .num
          position: absolute
          top: -4px
          right: -4px
          width: 16px
          height: 16px
          line-height: 16px
          text-align: center
          font-size: 12px
          color: #fff
          background-color: red
          border-radius: 50%
      .price
        padding-right: 12px
        line-height: 24px
        font-size: 18px
        font-weight: 700
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        &.highlight
          color: #fff
      .desc
        margin-left: 12px
        font-size: 12px
    .content-right
      flex: 0 0 105px
      width: 105px
      color: #999
      background-color: rgb(47,55,63)
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 12px
        font-weight: 700
        &.not-enough
          color: #fff
          background-color: #787676
        &.enough
          color: #fff
          background-color: #28a745
  .shop-cart-list
    position: fixed
    right: 0
    bottom: 48px
    z-index: -1
    width: 100%
    background-color: #fff
    &.move-enter-active,
    &.move-leave-active
      transition: all .3s ease-in-out
    &.move-enter,
    &.move-leave-active
      transform: translate3d(0, 100%, 0)
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      border-bottom: 1px solid #e5e5e5
      .title
        float: left
        font-size: 14px
        color: red
      .empty
        float: right
        font-size: 12px
        color: blue
    .list-content
      padding: 0 18px
      max-height: 240px
      overflow: hidden
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        .name
          line-height: 24px
          font-size: 14px
          color: blue
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-weight: 700
          font-size: 14px
          color: red
        .cart-control-wrapper
          position: absolute
          right: 0
          bottom: 6px
  .background
    position: fixed
    top: 0
    left: 0
    z-index: -2
    width: 100%
    height: 100%
    background-color: rgba(7,17,27,0.6)
    backdrop-filter: blur(10px)
    opacity: 1
    &.fade-enter-active,
    &.fade-leave-active
      transition: all .3s ease-in-out
    &.fade-enter,
    &.fade-leave-active
      opacity: 0
      background-color: rgba(7,17,27,0)
</style>
