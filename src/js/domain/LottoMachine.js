import LottoNumber from "./LottoNumber.js";

export default class LottoMachine {
    static autoPick() {
        return LottoNumber.getLottoPaper()
            .sort(() => Math.random() - 0.5)
            .splice(0, LottoNumber.LOTTO_LENGTH)
            .sort((a, b) => {
                return a - b;
            });
    }
}
