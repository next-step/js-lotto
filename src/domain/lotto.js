export class Lotto {
    #expectedNumbers;

    constructor(expectedNumbers) {
        // todo : 번호의 범위는 1부터 99까지
        // todo : 6개의 숫자인지 확인
        // -> LottoValidator 필요.
        expectedNumbers.sort();
        this.#expectedNumbers = expectedNumbers;
    }

    get expectedNumbers() {
        return this.#expectedNumbers;
    }

    print() {
        console.log(this.expectedNumbers)
    }
}