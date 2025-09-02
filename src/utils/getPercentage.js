/**
 * 0~1 사이의 값에 대해 퍼센트로 변환합니다.
 * 소수점은 버림(Math.floor)처리합니다.
 */
export function getPercentage(value) {
  return Math.floor(value * 100);
}
