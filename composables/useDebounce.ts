import { ref } from "vue";

export default function useDebounce(handler: () => void, time = 500) {
  const timer = ref<NodeJS.Timeout>();

  return (...args: unknown[]) => {
    if (timer.value) {
      clearTimeout(timer.value);
    }
    timer.value = setTimeout(handler.bind(null, ...args), time);
  };
}
