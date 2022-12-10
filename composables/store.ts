import searchCache from "./searchCache";

export interface StoreState {
  searchHistory: string[];
}

export function useStore() {
  return useState<StoreState>("store", () => ({ searchHistory: searchCache.getAll() }));
}

export function saveSearchHistory(query: string) {
  const state = $(useStore());
  state.searchHistory = searchCache.addOne(query);
}

export function deleteSearchHistory(query: string) {
  const state = $(useStore());
  state.searchHistory = searchCache.removeOne(query);
}

export function clearSearchHistory(query: string) {
  const state = $(useStore());
  state.searchHistory = searchCache.clearAll();
}
