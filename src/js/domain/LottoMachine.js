import { LottoNumber } from "./LottoNumber.js";

const LOTTO_LENGTH = 6;

export class LottoMachine {
    static getLottoNumbers(amount) {
        return Array.from({ length: amount }, () => {
            return LottoNumber.createAutoLotto()
                .sort(() => Math.random() - 0.5)
                .splice(0, LOTTO_LENGTH)
                .sort((a, b) => {
                    return a - b;
                });
        });
    }
}
