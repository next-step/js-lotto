import AbstractLottoNumbers from "./AbstractLottoNumbers.js";

export default class WinningNumbers extends AbstractLottoNumbers {
  constructor({ numbers, min, max, count }) {
    super({ numbers, min, max, count });
  }
}
