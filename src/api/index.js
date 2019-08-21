import BaseUrl from './config'
import { get } from 'common/js/axios'

const getSeller = get(BaseUrl + 'api/seller')
const getGoods = get(BaseUrl + 'api/goods')
const getRatings = get(BaseUrl + 'api/ratings')

export {
  getSeller,
  getGoods,
  getRatings
}
