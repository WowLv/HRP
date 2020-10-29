import Vue from "vue";

export function debounce(fn, delay = 200) {
  let timer = null;
  return function(...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export function handleMsg(res) {
  if (res.success) {
    Vue.prototype.$message({
      message: res.msg,
      type: "success"
    });
  } else {
    Vue.prototype.$message({
      message: res.msg,
      type: "warning"
    });
  }
}
