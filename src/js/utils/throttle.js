export default function throttle() {
  let time;
  return ({ duration, callback }) => {
    if (time) return;
    time = setTimeout(() => {
      time = null;
      callback();
    }, duration);
  };
}
