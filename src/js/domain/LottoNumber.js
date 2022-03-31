export class LottoNumber {
    static MIN = 1;
    static MAX = 45;
    static getLottoNumber() {
        return Array.from({ length: this.MAX }, (v, i) => ++i);
    }
}
