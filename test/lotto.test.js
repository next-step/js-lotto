const lotto = require('../src/js/lotto.js')
const LottoValidator = require('../src/utils/validate.js')
const LottoNumbers = require('../src/js/LottoNumbers.js')
const View = require('../src/js/view.js')
const { ERROR_MESSAGE, RESULT_MESSAGE, LOTTO_PRICE } = require('../src/js/constants.js')

describe('LottoValidator', () => {
    describe('amountValidate', () => {
        it('return the validated amount', () => {
            const validAmount = LOTTO_PRICE * 2;
            expect(LottoValidator.amountValidate(validAmount)).toBe(validAmount);
        });

        it('throws an error for NONUMBER', () => {
            const invalidAmount = -100;
            expect(() => {
                LottoValidator.amountValidate(invalidAmount);
            }).toThrowError(ERROR_MESSAGE.NONUMBER);
        });

        it('throws an error for AMOUNT_MIN', () => {
            const invalidAmount = LOTTO_PRICE - 1;
            expect(() => {
                LottoValidator.amountValidate(invalidAmount);
            }).toThrowError(ERROR_MESSAGE.AMOUNT_MIN);
        });
    });

    describe('checkWinningNumbers', () => {
        it('return the winningNumbers', () => {
            const validWinningNumbers = [3, 8, 12, 18, 24, 34];
            expect(LottoValidator.checkWinningNumbers(validWinningNumbers)).toEqual(validWinningNumbers);
        });

        it('throws an error for PUT_WIN_NUMBER_COUNT', () => {
            const invalidWinningNumbers = [3, 8, 12, 18, 24]; // Assuming WIN_NUMBER_COUNT is 6
            expect(() => {
                LottoValidator.checkWinningNumbers(invalidWinningNumbers);
            }).toThrowError(ERROR_MESSAGE.PUT_WIN_NUMBER_COUNT);
        });
    });

    describe('checkBonusNumber', () => {
        it('return the bonusNumber', () => {
            const validBonusNumber = [42];
            expect(LottoValidator.checkBonusNumber(validBonusNumber)).toEqual(validBonusNumber);
        });

        it('throws an error for PUT_BONUS_NUMBER_COUNT', () => {
            const invalidBonusNumber = [42, 55]; // Assuming BONUS_NUMBER_COUNT is 1
            expect(() => {
                LottoValidator.checkBonusNumber(invalidBonusNumber);
            }).toThrowError(ERROR_MESSAGE.PUT_BONUS_NUMBER_COUNT);
        });
    });
});

describe('View', () => {
    describe('printResult', () => {
        it('prints the result and profit percentage', () => {
            const resultCounts = [
                { rank: 5, text: "3개 일치 (5,000원)", prize: 5000, count: 1 },
                { rank: 4, text: "4개 일치 (50,000원)", prize: 50000, count: 2 },
                { rank: 3, text: "5개 일치 (1,500,000원)", prize: 1500000, count: 0 },
                { rank: 2, text: "5개 일치, 보너스 볼 일치 (30,000,000원)", prize: 30000000, count: 0 },
                { rank: 1, text: "6개 일치 (2,000,000,000원)", prize: 2000000000, count: 0 }
            ];
            const profitPercentage = 62.5;

            const consoleLogSpy = jest.spyOn(console, 'log');
            View.printResult(resultCounts, profitPercentage);

            expect(consoleLogSpy).toHaveBeenCalledWith(RESULT_MESSAGE.RESULT);
            expect(consoleLogSpy).toHaveBeenCalledWith(RESULT_MESSAGE.LINE);

            resultCounts.forEach(rank => {
                expect(consoleLogSpy).toHaveBeenCalledWith(RESULT_MESSAGE.RESULT_COUNT(rank.text, rank.count));
            });

            expect(consoleLogSpy).toHaveBeenCalledWith(RESULT_MESSAGE.RESULT_RATE(profitPercentage.toFixed(2)));

            consoleLogSpy.mockRestore();
        });
    });
});


describe('LottoNumbers', () => {
    describe('generateRandomNumbers', () => {
        it('return numbers between 1 and 45', () => {
            const randomNumbers = LottoNumbers.generateRandomNumbers();
            expect(randomNumbers).toHaveLength(6);
            randomNumbers.forEach(number => {
                expect(number).toBeGreaterThanOrEqual(1);
                expect(number).toBeLessThanOrEqual(45);
            });
            expect(new Set(randomNumbers).size).toBe(6); // Check for uniqueness
        });
    });

    describe('getNumbers', () => {
        it('return lottoNumbers', () => {
            const numLottos = 5;
            const lottoNumbersList = LottoNumbers.getNumbers(numLottos);
            expect(lottoNumbersList).toHaveLength(numLottos);

            lottoNumbersList.forEach(lottoNumbers => {
                expect(lottoNumbers).toHaveLength(6);
                lottoNumbers.forEach(number => {
                    expect(number).toBeGreaterThanOrEqual(1);
                    expect(number).toBeLessThanOrEqual(45);
                });
                expect(new Set(lottoNumbers).size).toBe(6); // Check for uniqueness
            });
        });

        it('print message', () => {
            const numLottos = 5;
            const consoleLogSpy = jest.spyOn(console, 'log');

            LottoNumbers.getNumbers(numLottos);
            expect(consoleLogSpy).toHaveBeenCalledWith(RESULT_MESSAGE.PURCHASE(numLottos));

            consoleLogSpy.mockRestore();
        });
    });
})