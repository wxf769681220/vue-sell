<template>
  <div class="ratings-select">
    <div class="rating-type">
      <span class="inline-block positive" :class="{'active': selectType === 2}" @click="select(2, $event)">{{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="inline-block positive" :class="{'active': selectType === 0}" @click="select(0, $event)">{{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="inline-block negative" :class="{'active': selectType === 1}" @click="select(1, $event)">{{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent($event)">
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
const EVENT_TOGGLE = 'toggle'
const EVENT_SELECT = 'select'

export default {
  name: 'ratings-select',
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  watch: {},
  mounted() {
  },
  created() {
  },
  methods: {
    select(type, e) {
      if (!e._constructed) {
        return
      }
      this.$emit(EVENT_SELECT, type)
    },
    toggleContent(e) {
      if (!e._constructed) {
        return
      }
      this.$emit(EVENT_TOGGLE)
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
.ratings-select
  display: flex
  .rating-type
    padding: 18px 0
    margin: 0 18px
    .inline-block
      display: inline-block
      padding: 8px 12px
      margin-right: 8px
      line-height: 16px
      border-radius: 1px
      font-size: 12px
      color: rgb(77,85,93)
      &.active
        color: #fff
      &.positive
        background-color: rgba(0,160,220,0.2)
        &.active
          background-color: rgb(0,160,220)
      &.negative
        background-color: rgba(77,85,93,0.2)
        &.active
          background-color: rgb(0,160,220)
      .count
        margin-left: 2px
  .switch
    display: flex
    align-items: center
    padding: 12px 18px
    line-height: 24px
    border-bottom: 1px solid #a1a1a1
    color: grey
    &.on
      .text
        font-size: 12px
        font-weight: 700
        color: green
</style>
