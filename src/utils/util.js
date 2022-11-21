export default class Util {
  static randomNumber(min = 0, max = 10) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static toAscendingArr(arr) {
    return arr.sort((a, b) => a - b);
  }
}
