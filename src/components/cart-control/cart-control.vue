<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decrease">-</div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="add">+</div>
  </div>
</template>

<script>
export default {
  name: 'cart-control',
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  created() {
    // console.log(this.food)
  },
  methods: {
    add(e) {
      // console.log(e)
      // better-scroll特有的_constructed属性值默认为true
      // 这里是使用better-scroll的click事件而阻止使用浏览器默认的click
      if (!e._constructed) {
        return
      }
      if (!this.food.count) {
        // 添加count属性, 并初始化值为1, 使用$set可以使vue实时监控count的变化
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decrease() {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
//@import "~common/stylus/variable"

.cart-control
  display: flex
  align-items: center
  .cart-decrease
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 16px
    font-weight: 700
    color: blue
    border: 1px solid blue
    opacity: 1
    &.move-enter-active, &.move-leave-active
      transition: all 0.4s linear
    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
  .cart-count
    padding: 6px
    line-height: 24px
    text-align: center
    font-size: 12px
    font-weight: 700
    color: red
    border: 1px solid grey
  .cart-add
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 16px
    font-weight: 700
    color: blue
    border: 1px solid blue
</style>
