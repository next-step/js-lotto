export default class ArrayUtil {
  static toAscending(arr) {
    return arr.sort((a, b) => a - b);
  }
}
