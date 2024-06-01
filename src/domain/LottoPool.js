import { MAX_NUMBER } from "../constants/number";
import LottoNumber from "./LottoNumber";

class LottoPool {
  static lottoNumberPool = Array.from(
    { length: MAX_NUMBER },
    (v, i) => new LottoNumber(i + 1)
  );
  constructor() {}

  static generateLottoNumber(value) {
    const pickNumber = this.lottoNumberPool[value];

    return pickNumber;
  }
}
export default LottoPool;
