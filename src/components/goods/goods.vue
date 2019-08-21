<template>
  <div class="goods">
    <div class="content">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" :class="{'current': currentIndex === index}" v-for="(item,index) in goods" :key="item.name" @click="selectedMenu(index, $event)">
            <span class="text">
              <support-ico class="icon" v-show="item.type > 0" :size=3 :type="item.type"></support-ico>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-group food-group-hook" v-for="item in goods" :key="item.name">
            <h4 class="title">{{item.name}}</h4>
            <ul>
              <li class="food-item" v-for="food in item.foods" :key="food.name" @click="selectedFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cart-control-wrapper">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车组件-->
    <div class="shop-cart-wrapper">
      <shop-cart ref="shopCart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shop-cart>
    </div>
    <!-- 商品详情页组件-->
    <food ref="food" :food="food"></food>
  </div>
</template>

<script>
import SupportIco from 'components/support-ico/support-ico'
import ShopCart from 'components/shop-cart/shop-cart'
import CartControl from 'components/cart-control/cart-control'
import Food from 'components/food/food'

import BScroll from 'better-scroll'
import { getGoods } from 'api'

const ERR_OK = 0

export default {
  name: 'goods',
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
      goods: [],
      listHeight: [],
      scrollY: 0,
      food: {}
    }
  },
  computed: {
    currentIndex() {
      // 滚动的位置落在某一个区间
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i]
        let h2 = this.listHeight[i + 1]
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((goods) => {
        goods.foods.forEach((food) => {
          // 判断food.count大于0,说明该food已经被选中
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  watch: {},
  mounted() {},
  created() {
    // console.log(this.seller)
    this.getGoods()
  },
  methods: {
    getGoods() {
      getGoods().then((res) => {
        // console.log(res)
        if (res.errno === ERR_OK) {
          this.goods = res.data
          // DOM已更新完毕,可以进行DOM操作
          this.$nextTick(() => {
            // 初始化better-scroll
            this._initScroll()
            // 计算高度
            this._calculateHeight()
          })
        }
      })
    },
    selectedMenu(index, e) {
      // console.log(index)
      // console.log(e)
      // 因为使用了betters-scroll的click派发事件,因此这里将阻止浏览器默认的click事件
      // 防止click点击一次触发两次事件
      if (!e._constructed) {
        return
      }

      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-group-hook')
      let el = foodList[index]
      // 调用better-scroll的scrollToElement接口,表示滚动到某一元素
      this.foodsScroll.scrollToElement(el, 300)
    },
    selectedFood(food) {
      this.food = food
      this.$refs.food.show()
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true // 开启可以使用 better-scroll的click派发事件
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3 // 开启可以获取滚动位置
      })
      // 监听滚动的实时位置
      this.foodsScroll.on('scroll', (pos) => {
        // 转换为正整数
        this.scrollY = Math.abs(Math.round(pos.y))
        // console.log(this.scrollY)
      })
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-group-hook')
      // console.log(foodList)
      // 初始化高度
      let height = 0
      this.listHeight.push(height)
      // 循环累加
      for (let i = 0, len = foodList.length; i < len; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    }
  },
  components: {
    SupportIco,
    ShopCart,
    CartControl,
    Food
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin"
.goods
  position: relative
  padding-bottom: 48px
  height: 100%
  background-color: #fff
  overflow: hidden
  & > .content
    display: flex
    height: 100%
    .menu-wrapper
      flex: 0 0 80px
      padding: 0 12px
      width: 80px
      height: 100%
      background-color: #e5e5e5
      overflow: hidden
      .menu-item
        display: table
        width: 56px
        height: 54px
        line-height: 14px
        .text
          display: table-cell
          width: 56px
          font-size: 12px
          vertical-align: middle
          .icon
            display: inline-block
            margin-right: 2px
            width: 12px
            height: 12px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat
        &.current
          font-weight: 500
          color: red
    .foods-wrapper
      flex: 1 1 auto
      height: 100%
      overflow: hidden
      .food-group
        .title
          padding-left: 14px
          font-size: 16px
          font-weight: 500
          color: #a3a3a3
          background-color: #e5e5e5
          border-left: 4px solid #cecece
        ul
          li.food-item
            display: flex
            padding: 18px
            .icon
              flex: 0 0 57px
              margin-right: 10px
              img
                height: auto
            .content
              position: relative
              flex: 1 1 auto
              .name
                margin: 2px 0 8px 0
                height: 14px
                line-height: 14px
                font-size: 14px
                color: #333
              .desc, .extra
                line-height: 10px
                font-size: 10px
                color: #a1a1a1
              .desc
                line-height: 12px
                margin-bottom: 8px
              .extra
                .count
                  margin-right: 12px
              .price
                font-weight: 700
                line-height: 24px
                .now
                  margin-right: 8px
                  font-size: 14px
                  color: red
                .old
                  text-decoration: line-through
                  font-size: 12px
                  color: #a1a1a1
              .cart-control-wrapper
                position: absolute
                right: 0
                bottom: 0
  .shop-cart-wrapper
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
</style>
