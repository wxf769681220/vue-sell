<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratings-select
        :ratings="ratings"
        :selectType="selectType"
        :onlyContent="onlyContent"
        :desc="desc"
        @select="eventSelect"
        @toggle="eventToggle">
      </ratings-select>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-show="needShow(rating.rateType, rating.text)" v-for="(rating,index) in ratings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up">icon</span>
                <span class="item" v-for="(item,index) in rating.recommend" :key="index">
                  {{item}}
                </span>
              </div>
              <div class="time">
                {{format(rating.rateTime)}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Star from 'components/star/star'
import Split from 'components/split/split'
import RatingsSelect from 'components/ratings-select/ratings-select'
import moment from 'moment'
import BScroll from 'better-scroll'
import { getRatings } from 'api'

const ERR_OK = 0
const ALL = 2

export default {
  name: 'ratings',
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
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      ratings: []
    }
  },
  computed: {

  },
  watch: {},
  mounted() {},
  created() {
    this.getRatings()
  },
  methods: {
    getRatings() {
      getRatings().then((res) => {
        console.log(res)
        if (res.errno === ERR_OK) {
          this.ratings = res.data
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      })
    },
    format (time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
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
    _initScroll() {
      this.scroll = new BScroll(this.$refs.ratings, {
        click: true
      })
    }
  },
  components: {
    Split,
    Star,
    RatingsSelect
  }
}
</script>

<style lang="stylus" scoped>
.ratings
  position: relative
  height: 100%
  background-color: #fff
  overflow: hidden
  .overview
    display: flex
    padding: 18px 0
    .overview-left
      flex: 0 0 137px
      padding: 6px 0
      width: 137px
      border-right: 1px solid green
      text-align: center
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px
      .score
        margin-bottom: 6px
        line-height: 28px
        font-size:16px
        color: orange
      .title
        margin-bottom: 8px
        line-height: 12px
        font-size:12px
        color: grey
      .rank
        line-height: 10px
        font-size: 12px
        color: grey
    .overview-right
      flex: 1
      padding: 6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left: 6px
      .score-wrapper
        display: flex
        align-items: center
        margin-bottom: 8px
        .title
          line-height: 18px
          font-size: 12px
          color: grey
        .star
          margin: 0 12px
        .score
          line-height: 18px
          font-size: 12px
          color: orange
      .delivery-wrapper
        display: flex
        align-items: center
        .title
          line-height: 18px
          font-size: 12px
          color: grey
        .delivery
          margin-left: 12px
          font-size: 12px
          color: grey
  .rating-wrapper
    padding: 0 18px
    .rating-item
      display: flex
      padding: 18px 0
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          height: auto
          border-radius: 50%
      .content
        position: relative
        flex: 1
        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: 12px
          color: grey
        .star-wrapper
          margin-bottom: 6px
          display: flex
          align-items: center
          .star
            margin-right: 6px
          .delivery
            font-size: 12px
            color: grey
        .text
          margin-bottom: 8px
          line-height: 18px
          color: grey
          font-size: 12px
        .recommend
          display: flex
          align-items: center
          flex-wrap: wrap
          line-height: 16px
          .icon-thumb_up, .item
            margin: 0 8px 4px 0
            font-size: 12px
          .icon-thumb_up
            color: blue
          .item
            padding: 0 6px
            border: 1px solid red
            border-radius: 1px
            color: grey
            background-color: #fff
        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: 12px
          color: grey
</style>
