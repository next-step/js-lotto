import { Lotto } from "../Lotto/index.js";
import { generateLottoNumbers } from "./utils/generateLottoNumbers.js";

export class LottoMachine {
  issueLottos(count) {
    return Array.from(
      { length: count },
      () => new Lotto(generateLottoNumbers())
    );
  }
}
