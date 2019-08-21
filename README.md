########## 默认配置 ##########
"core-js": "^2.6.5",
"vue": "^2.6.10",
"vue-router": "^3.0.3",
"vuex": "^3.0.1" 

#数据通信
axios
"better-scroll": "2.0.0-alpha.20",
"moment": "^2.24.0",  //日期格式
"query-string": "^6.8.2", //解析url参数
"good-storage": "^1.1.0" //储存库 localStorage

#动态组件的用法

<div v-for="tab in tabs">
  <component :is="tab.component" :data="tab.data"></component>
</div>

import Tpl1 from 'base/tpl1'
import Tpl2 from 'base/tpl2'
import Tpl3 from 'base/tpl3'

data() {
  return {
    tabs: [
      { component: Tpl1, data: [] },
      { component: Tpl2, data: [] },
      { component: Tpl3, data: [] }
    ]
  }
}

#css scoped
在 scoped 模式下，使父组件的样式能够深入影响到子组件，可以使用 >>>

<style lang="stylus" scoped>
.tab
  display: flex
  >>> .cube-ul
    display: block
</style>


#打包后资源可视化界面（dist report.html）
"report": "vue-cli-service build --report"

#es6
http://es6.ruanyifeng.com

#stylus
http://www.zhangxinxu.com/jq/stylus

#设备像素比
http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio

#针对moment第三方库的优化（去掉国际化语言包）
配置 ./vue.config
  chainWebpack(config) {
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  }


