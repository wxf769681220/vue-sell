const urlMap = {
  development: '/',
  production: 'http://ustbhuangyi.com/sell/'
}

const baseUrl = urlMap[process.env.NODE_ENV]

export default baseUrl
