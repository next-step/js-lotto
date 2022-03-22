/**
 * @name 1~45범위안 숫자인지 확인하는 함수
 * ```js
 * isRangeNumber(40) // return true
 * isRangeNumber(46) // return false
 * ```
 */
export const isRangeNumberInLotto = (number) => {
  if (isNaN(number)) return false;
  const regex = /\b([1-9]|[123][0-9]|4[0-5])\b/;
  return regex.test(number);
};

/**
 * @name selector를 가져오는 함수
 * ```js
 * // 사용방법
 * const $root = getSelector('#root')
 * ```
 */
export const getSelector = (selector) => document.querySelector(selector);
