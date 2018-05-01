import { getSearch } from '@/common/js/cache'
const state = {
  searchHistory: getSearch(),
  user: {}
}

export default () => state
