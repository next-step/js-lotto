import ModalService from './ModalService.js';
import {PRICE_PER_TICKET} from '../consts.js';

export const MIN_LOTTO_NUMBER = 1;
export const MAX_LOTTO_NUMBER = 45;
export const COUNT_LOTTO_NUMBERS_PER_TICKET = 6;

const COUNT_LOTTO_NORMAL_NUMBERS = 6;
const COUNT_LOTTO_BONUS_NUMBER = 1;

export const SAME_NUMBER_COUNT_TYPE = {
    THREE: 'THREE',
    FOUR: 'FOUR',
    FIVE: 'FIVE',
    FIVE_BONUS: 'FIVE_BONUS',
    SIX: 'SIX',
};
export const PRIZE_MONEY = {
    [SAME_NUMBER_COUNT_TYPE.THREE]: 5_000,
    [SAME_NUMBER_COUNT_TYPE.FOUR]: 50_000,
    [SAME_NUMBER_COUNT_TYPE.FIVE]: 1_500_000,
    [SAME_NUMBER_COUNT_TYPE.FIVE_BONUS]: 30_000_000,
    [SAME_NUMBER_COUNT_TYPE.SIX]: 2_000_000_000,
};

/**
 * @param count
 * @return {Ticket[]}
 */
function autoGenerateLottoNumbers(count) {
    return Array(count)
        .fill(null)
        .map(_ => {
            const randomNumbers = makeNonDuplicatedRandomNumbers(COUNT_LOTTO_NUMBERS_PER_TICKET, MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER);
            return {
                normalNumbers: randomNumbers.slice(0, randomNumbers.length),
            };
        });
}

function makeNonDuplicatedRandomNumbers(count, min, max) {
    const numbers = Array.from({length: max - min + 1}, (_, i) => (min + i));
    return shuffle(numbers).slice(0, count);
}

function shuffle(numbers) {
    return numbers.slice().sort(() => Math.random() - 0.5);
}

function validateWinningNumber({normalNumbers, bonusNumber}) {
    const isDuplicatedWinningNumber = new Set([...normalNumbers, bonusNumber]).size < COUNT_LOTTO_NORMAL_NUMBERS + COUNT_LOTTO_BONUS_NUMBER;
    if (isDuplicatedWinningNumber) {
        ModalService.alert('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
        return false;
    }

    return true;
}

/**
 * @param {Ticket[]} tickets
 * @param {WinningNumbers} winningNumbers
 */
function computeLottoResult({tickets, winningNumbers}) {
    const lottoResult = Object.keys(SAME_NUMBER_COUNT_TYPE).reduce((result, sameNumberCountType) => {
        result[sameNumberCountType] = {
            prizeMoney: PRIZE_MONEY[sameNumberCountType],
            count: 0,
        };
        return result;
    }, {});

    const {normalNumbers, bonusNumber} = winningNumbers;
    const normalNumbersSet = new Set(normalNumbers);

    tickets.forEach(ticket => {
        const sameNormalNumberCount = ticket.normalNumbers.filter(number => normalNumbersSet.has(number)).length;

        switch (sameNormalNumberCount) {
            case 6:
                lottoResult[SAME_NUMBER_COUNT_TYPE.SIX].count += 1;
                return;

            case 5:
                if (ticket.normalNumbers.includes(bonusNumber)) {
                    lottoResult[SAME_NUMBER_COUNT_TYPE.FIVE_BONUS].count += 1;
                    return;
                }
                lottoResult[SAME_NUMBER_COUNT_TYPE.FIVE].count += 1;
                return;

            case 4:
                lottoResult[SAME_NUMBER_COUNT_TYPE.FOUR].count += 1;
                return;

            case 3:
                lottoResult[SAME_NUMBER_COUNT_TYPE.THREE].count += 1;
                return;
        }
    });

    const amount = tickets.length * PRICE_PER_TICKET;
    const totalPrizeMoney = [...Object.values(lottoResult)].reduce((totalPrizeMoney, {prizeMoney, count}) => {
        return totalPrizeMoney + (prizeMoney * count);
    }, 0);
    const rateOfProfit = Math.round((totalPrizeMoney / amount) * 100);

    return {
        lottoResult,
        rateOfProfit,
    };
}

export default {
    autoGenerateLottoNumbers,
    validateWinningNumber,
    computeLottoResult,
};
