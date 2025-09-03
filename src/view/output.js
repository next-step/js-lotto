import { Lotto } from "../domain/lotto.js";

/**
 *
 * @param {Lotto[]} lottoList
 */
export function printLotto(lottoList) {
  console.log(`${lottoList.length}개를 구매했습니다.`);
  lottoList.forEach((lotto) => {
    console.log(`[${lotto.text().join(", ")}]`);
  });
}
