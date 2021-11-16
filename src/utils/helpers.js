export const shuffle = (min, max, length) => {
  const arr = Array.from({ length }, () => Math.floor(Math.random() * (max - min) + min));
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
};
