<template>
  <Transition name="confirm">
    <div v-show="showFlag" class="confirm">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{ content }}</p>
          <div class="operate">
            <div class="operate-btn left" @click="cancel">
              {{ cancelBtnText }}
            </div>
            <div class="operate-btn" @click="confirm">{{ confirmBtnText }}</div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    content: {
      type: String,
      required: true
    },
    cancelBtnText: {
      type: String,
      default: "取消"
    },
    confirmBtnText: {
      type: String,
      default: "确认"
    }
  },
  setup(props, { emit }) {
    const showFlag = ref(false);

    const show = () => {
      showFlag.value = true;
    };

    const hide = () => {
      showFlag.value = false;
    };

    const cancel = () => {
      hide();
      emit("cancel");
    };

    const confirm = () => {
      hide();
      emit("confirm");
    };

    return { showFlag, show, hide, cancel, confirm };
  }
};
</script>

<style lang="stylus" scoped>
.confirm
  page-fixed()
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
  &.confirm-enter-active
    animation: confirm-fadein 0.3s;
    .confirm-content
      animation: confirm-zoom 0.3s;
  .confirm-wrapper
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    .confirm-content
      width: 270px;
      border-radius: 13px;
      background: rgba(255,255,255,0.9);
      .text
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        color: #333;
      .operate
        display: flex;
        align-items: center;
        text-align: center;
        .operate-btn
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid #999;
          color: #1e7dd7;
          &.left
            border-right: 1px solid #999;
@keyframes confirm-fadein
  0%
    opacity: 0;
  100%
    opacity: 1;
@keyframes confirm-zoom
  0%
    transform: scale(0);
  50%
    transform: scale(1.1);
  100%
    transform: scale(1);
</style>
