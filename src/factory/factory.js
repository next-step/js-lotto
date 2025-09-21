import { Lotto } from "../domain/lotto.js";

export class Factory {

    static Create() {
        const min = 1;
        const max = 99;
        const numbers = this.generateRandomLottoNumber(6, min, max);
        return new Lotto(numbers);
    }

    static generateRandomLottoNumber(count, min, max) {
        const numbers = Array(count);
        for (let i = 0; i < count; i++) {
            const number = Math.ceil(Math.random() * (max - min)) + min;
            numbers.push(number);
        }

        return numbers;
    }
}