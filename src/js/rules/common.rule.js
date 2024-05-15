/**
 * 입력받은 값이 숫자인지 확인합니다.
 * @param {string} value
 * @returns boolean
 */
export const isInputNumber = (value) => {
  return !isNaN(value) && value.trim() !== "";
};
