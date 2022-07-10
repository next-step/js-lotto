export default function debounce(duration) {
  let time;
  return callback => {
    if (time) return;
    time = setTimeout(() => {
      time = null;
      callback();
    }, duration);
  };
}
