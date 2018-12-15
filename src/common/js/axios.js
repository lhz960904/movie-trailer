import axios from 'axios'
import router from '@/router'

const instance = axios.create({
  baseURL: '/'
})

instance.interceptors.response.use(res => {
  return res.data
}, () => {
  router.push('/error')
})

export default {
  install: (Vue, option) => {
    Object.defineProperty(Vue.prototype, '$axios', { value: instance })
  }
}
