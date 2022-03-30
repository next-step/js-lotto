const LOTTO_MAX_NUMBER = 45;

export class LottoNumber {
    static createAutoLotto() {
        return Array.from({ length: LOTTO_MAX_NUMBER }, (v, i) => ++i);
    }
}
