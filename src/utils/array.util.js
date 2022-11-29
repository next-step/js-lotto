export default class ArrayUtil {
  static toAscending(arr = []) {
    return arr.sort((a, b) => a - b);
  }

  static checkDuplicateExists(arr = []) {
    return arr.length !== new Set(arr).size;
  }
}
