import FirstPrize from "../domain/prize/FirstPrize.js";
import SecondPrize from "../domain/prize/SecondPrize.js";
import ThirdPrize from "../domain/prize/ThirdPrize.js";
import FourthPrize from "../domain/prize/FourthPrize.js";
import FifthPrize from "../domain/prize/FifthPrize.js";

const prizeLabelMapping = new Map([
  [FirstPrize, "6개 일치 (2,000,000,000원)"],
  [SecondPrize, "5개 일치, 보너스 볼 일치 (30,000,000원)"],
  [ThirdPrize, "5개 일치 (1,500,000원)"],
  [FourthPrize, "4개 일치 (50,000원)"],
  [FifthPrize, "3개 일치 (5,000원)"],
]);

/**
 * 주어진 Prize 인스턴스에 해당하는 출력 문자열을 반환.
 * @param {Prize} prizeInstance - Prize 인스턴스
 * @returns {string} - 출력용 문자열 (예: "3개 일치 (5,000원)")
 */
export function getPrizeLabel(prizeInstance) {
  return prizeLabelMapping.get(prizeInstance.constructor);
}
