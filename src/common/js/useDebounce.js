import { ref } from "vue";

export default function useDebounce(fn, time = 500) {
  const timer = ref(null);

  return (...args) => {
    if (timer.value) {
      clearTimeout(timer.value);
    }
    timer.value = setTimeout(fn.bind(null, ...args), time);
  };
}
