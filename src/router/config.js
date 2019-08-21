const Tpl = () => import('base/tpl')
const Goods = () => import('components/goods/goods')
const Ratings = () => import('components/ratings/ratings')
const Seller = () => import('components/seller/seller')

const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  },
  {
    path: '/tpl',
    component: Tpl
  }
]

export default routes
