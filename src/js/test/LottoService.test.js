import { COUNT_NUMBERS_PER_TICKET, MAX_NUMBER, MIN_NUMBER } from "../constants";
import { LottoNumber } from "../LottoService/lottoNumber";
import { LottoNumbers } from "../LottoService/lottoNumbers";
import makeNonDuplicatedRandomNumbers from "../LottoService/makeNonDuplicatedRandomNumbers";

test("makeNonDuplicatedRandomNumbers to return LottoNumbers with correct amount of LottoNumber", () => {
    const randomNumbers = makeNonDuplicatedRandomNumbers(
        COUNT_NUMBERS_PER_TICKET,
        MIN_NUMBER,
        MAX_NUMBER
    );
    expect(randomNumbers.getRandomNumbers().length).toEqual(
        COUNT_NUMBERS_PER_TICKET
    );
    expect(randomNumbers).toBeInstanceOf(LottoNumbers);
    randomNumbers.getRandomNumbers().map((number) => {
        expect(number).toBeInstanceOf(LottoNumber);
        expect(number.value()).toBeLessThanOrEqual(MAX_NUMBER);
        expect(number.value()).toBeGreaterThanOrEqual(MIN_NUMBER);
    });
});