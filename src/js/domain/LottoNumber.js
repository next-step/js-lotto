import { WinningNumbers } from "./WinningNumbers.js";

export class LottoNumber {
    static MIN = 1;
    static MAX = 45;
    static LOTTO_LENGTH = 6;
    static getLottoPaper() {
        return Array.from({ length: LottoNumber.MAX }, (v, i) => ++i);
    }

    static validate() {
        WinningNumbers
    }
}
