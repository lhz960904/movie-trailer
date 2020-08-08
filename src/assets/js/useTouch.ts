import { watch, Ref } from "vue";

interface TouchState<T> {
  list: T[];
  loading: boolean;
  noMore: boolean;
}

interface EventHandler {
  touchStart: (e: TouchEvent) => void;
  touchMove: (e: TouchEvent) => void;
  touchEnd: (e: TouchEvent) => void;
}

export default function useTouch(
  domRef: Ref<HTMLElement | undefined>,
  callbacks: EventHandler
) {
  // 是否touch标志位
  let initiated = false;

  const stop = watch(
    domRef,
    (el: HTMLElement | undefined, prevEl, onCleanup) => {
      if (!el) return;

      const touchStart = (e: TouchEvent) => {
        e.preventDefault();
        initiated = true;
        callbacks.touchStart(e);
      };

      const touchMove = (e: TouchEvent) => {
        e.preventDefault();
        if (!initiated) return;
        callbacks.touchMove(e);
      };

      const touchEnd = (e: TouchEvent) => {
        initiated = false;
        callbacks.touchEnd(e);
      };

      el.addEventListener("touchstart", touchStart);
      el.addEventListener("touchmove", touchMove);
      el.addEventListener("touchend", touchEnd);

      onCleanup(() => {
        el.removeEventListener("touchstart", touchStart);
        el.removeEventListener("touchmove", touchMove);
        el.removeEventListener("touchend", touchEnd);
      });
    },
    { immediate: true }
  );

  return stop;
}
