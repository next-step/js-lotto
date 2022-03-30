import { LottoNumber } from "./lottoNumber";
import { LottoNumbers } from "./lottoNumbers";

export function makeNonDuplicatedRandomNumbers(count, min, max) {
    const numbers = Array.from({
            length: max - min + 1,
        },
        (_, i) => min + i
    );
    shuffle(numbers);
    return numberToLottoNumberMapper(numbers, count);
}

const shuffle = (numbers) => {
    const randomEntropy = Math.random() - 0.5;
    numbers.sort(() => randomEntropy);
};

const numberToLottoNumberMapper = (numbers, count) => {
    return new LottoNumbers(
        numbers.slice(0, count).map((number) => new LottoNumber(number))
    );
};

export default makeNonDuplicatedRandomNumbers;