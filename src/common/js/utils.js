export function hasClass(el, className) {
  return el.classList.contains(className)
}

export function addClass(el, className) {
  el.classList.add(className)
}

/**
 * 格式化日期
 *  param format : 'yyyy-MM-dd hh:mm:ss'
 */
export function formatDate(date, format) {
  var currentDate = new Date(date)
  var o = {
    'M+': currentDate.getMonth() + 1,
    'd+': currentDate.getDate(),
    'h+': currentDate.getHours(),
    'm+': currentDate.getMinutes(),
    's+': currentDate.getSeconds(),
    'q+': Math.floor((currentDate.getMonth() + 3) / 3),
    'S': currentDate.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (currentDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}
