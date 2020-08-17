const SEARCH_KEY = "__search__";
const SEARCH_MAX_LENGTH = 10;

const storage = {
  get<T>(key: string, def: T) {
    const data = window.localStorage.getItem(key);
    if (!data) return def;
    try {
      const result = JSON.parse(data);
      return result as T;
    } catch (error) {
      return def;
    }
  },
  set<T>(key: string, val: T) {
    try {
      const str = JSON.stringify(val);
      window.localStorage.setItem(key, str);
    } catch (error) {
      // nothing
    }
  }
};

// 搜索缓存类
class SearchCache {
  private searchList: string[];

  constructor() {
    this.searchList = storage.get<string[]>(SEARCH_KEY, []);
  }

  getAll() {
    return this.searchList;
  }

  addOne(query: string) {
    const list = [...this.searchList];
    const index = list.findIndex(s => s === query);
    if (index > -1) {
      list.splice(index, 1);
    }
    list.unshift(query);
    if (list.length > SEARCH_MAX_LENGTH) {
      list.pop();
    }

    return this.resetList(list);
  }

  removeOne(query: string) {
    const list = this.searchList.filter(s => s !== query);
    return this.resetList(list);
  }

  clearAll() {
    return this.resetList([]);
  }

  private resetList(list: string[]) {
    this.searchList = list;
    storage.set(SEARCH_KEY, list);
    return this.searchList;
  }
}

export default new SearchCache();
