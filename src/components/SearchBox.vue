<template>
  <div class="search-box">
    <i class="iconfont icon-search" />
    <input
      v-model="query"
      type="text"
      class="search-input"
      :placeholder="placeholder"
      @input.stop="handleInput"
    />
    <i v-show="query" class="iconfont icon-delete" @click="clear" />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索电影"
    }
  },
  setup(props, { emit }) {
    const query = ref("");

    const handleInput = e => {
      emit("input", e.target.value);
    };

    const clear = () => {
      query.value = "";
      emit("clear");
    };

    const setQuery = str => {
      query.value = str;
    };

    return { query, setQuery, clear, handleInput };
  }
};
</script>

<style lang="stylus" scoped>
.search-box
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  .iconfont
    font-size: 17px;
    color: $gray;
  .search-input
    margin: 8px 20px 8px 5px;
    font-size: 13px;
    border: none;
    outline: none;
    width: calc(100% - 60px);
    color: #333;
</style>
