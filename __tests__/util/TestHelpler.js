import Lotto from "../../src/domain/Lotto";
import LottoNumber from "../../src/domain/LottoNumber";

export function createLotto(numbers) {
  return new Lotto(numbers.map((number) => new LottoNumber(number)));
}
