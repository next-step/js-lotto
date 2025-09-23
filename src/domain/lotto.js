export class Lotto {
    constructor(expectedNumbers) {
        // todo : 번호의 범위는 1부터 99까지
        // todo : 6개의 숫자인지 확인
        // -> LottoValidator 필요.
        this._expectedNumbers = expectedNumbers;
    }

    get expectedNumbers() {
        return this._expectedNumbers;
    }

    set expectedNumbers(numbers) {
        this._expectedNumbers = numbers;
    }

    contains(number) {
        return this._expectedNumbers.includes(number);
    }

    print() {
        console.log(this.expectedNumbers)
    }
}