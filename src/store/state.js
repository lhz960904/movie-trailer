import { getSearch } from '@/common/js/cache'
const state = {
  searchHistory: getSearch()
}

export default () => state
