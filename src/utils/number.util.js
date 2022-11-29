export default class NumberUtil {
  static randomNumber(min = 0, max = 10) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static formatting(value) {
    let converted = value;
    if ('string' !== typeof value) {
      converted = String(value);
    }
    return converted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
