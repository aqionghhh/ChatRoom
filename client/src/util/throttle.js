export const throttle = function (fn, delay) {
  let preTime = 0;
  return function () {
    const context = this;
    const args = arguments;
    const now = +new Date();
    if (now - preTime > delay) {
      fn.apply(context, args);
      preTime = now;
    }
  }
}