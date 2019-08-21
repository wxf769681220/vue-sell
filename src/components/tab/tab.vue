<template>
  <div class="tab">
    <router-link class="tab-item" tag="div" to="/goods">商品</router-link>
    <router-link class="tab-item" tag="div" to="/ratings">评论</router-link>
    <router-link class="tab-item" tag="div" to="/seller">商家</router-link>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {},
  components: {}
}
</script>

<style lang="stylus" scoped>
.tab
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  color: #fff
  background-color: #a1a1a1
  border: 0
  .tab-item
    flex: 1
    text-align: center
  .tab-item.active
    color: red
</style>
