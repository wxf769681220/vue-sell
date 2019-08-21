import Vue from 'vue'

/**
 * 字符串反转
 * @param {*} value 
 */
Vue.filter('reverse', function(value) {
  return value.split('').reverse().join('')
})


/**
 * 模拟盒子
 * @param {*} value 
 */
Vue.filter('wrap', function(value, start, end) {
  return start + value + end
})