export const RandomNumberGenerator = {
  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  },
  pickNumbersInRange({ startNumber, endNumber, count }) {
    const result = [];
    for (let i = startNumber; i <= endNumber; i += 1) {
      result.push(i);
    }
    console.log(this.shuffle(result).slice(0, count));
    return this.shuffle(result).slice(0, count);
  },
};
