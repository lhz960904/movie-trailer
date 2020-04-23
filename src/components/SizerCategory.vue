<template>
  <div class="category-wrapper">
    <div class="list">
      <span
        v-for="item in state.categoryList"
        :key="item._id"
        :class="{ active: state.selectList.includes(item.name) }"
        class="item"
        @click="selectItem(item.name)"
      >
        {{ item.name }}
      </span>
    </div>
    <button class="confirm-btn" @click="confirm">完成</button>
  </div>
</template>

<script>
import { reactive, onMounted, toRaw, computed } from "vue";
import axios from "@/common/js/axios";

export default {
  setup(props, { attrs, emit }) {
    const state = reactive({
      categoryList: [],
      selectList: []
    });

    const categories = computed(() => {
      return props.modelValue;
    });

    onMounted(async () => {
      const result = await axios.get("/api/category/get_cates");
      state.categoryList = result.cates;
      state.selectList = [...attrs.modelValue];
    });

    const selectItem = name => {
      const arr = state.selectList;
      const idx = arr.indexOf(name);
      if (idx > -1) {
        arr.splice(idx, 1);
      } else {
        arr.push(name);
      }
      state.selectList = arr;
    };

    const confirm = () => {
      emit("update:modelValue", toRaw(state.selectList));
      emit("change", toRaw(state.selectList));
    };

    return { state, categories, selectItem, confirm };
  }
};
</script>

<style lang="stylus" scoped>
.category-wrapper
  padding: 10px 25px;
  .list
    display: flex;
    flex-wrap: wrap;
    .item
      padding: 6px 12px;
      margin: 0 10px 10px 0
      border-radius: 5px;
      font-size: 13px;
      color: #777;
      border: 1px solid #ccc;
      &.active
        border-color: #faaf00;
        background: #faaf00;
        color: #fff;
  .confirm-btn
    width: 60px;
    height: 30px;
    background: #409eff;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 3px;
</style>
