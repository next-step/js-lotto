import { Lotto } from "../domain/lotto.js";
import { LottoType } from "../domain/lotto-type.js";

export class Factory {

    static Create(lottyType) {
        switch (lottyType) {
            case LottoType.SIMPLE:
                const min = 1;
                const max = 99;
                const numbers = this.generateRandomLottoNumber(6, min, max);
                return new Lotto(numbers)
            default:
                throw new Error('해당 타입의 로또는 존재하지 않습니다.');
        }
    }

    static generateRandomLottoNumber(count, min, max) {
        const numbers = Array(count);
        for (let i = 0; i < count; i++) {
            const number = Math.random() * (min - max) + min;
            numbers.push(number);
        }

        return numbers;
    }
}