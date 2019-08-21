<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <tab></tab>
    <div class="viewport">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import Tab from 'components/tab/tab'
import qs from 'query-string' // 解析url参数
import { getSeller } from 'api'

const ERR_OK = 0

export default {
  name: 'app',
  props: {},
  data() {
    return {
      seller: {
        id: qs.parse(location.search).id
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller({
        id: this.seller.id
      }).then((res) => {
        if (res.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, res.data)
        }
      })
    }
  },
  components: {
    VHeader,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
#app
  .viewport
    position: absolute
    top: 174px
    right: 0
    bottom: 0
    left: 0
</style>
