const MIN_NUMBER = 1;
const MAX_NUMBER = 45;
const COUNT_NUMBERS_PER_TICKET = 7;

/**
 * @param count
 * @return {Ticket[]}
 */
export function autoGenerateLottoNumbers(count) {
    return Array(count)
        .fill(null)
        .map(_ => {
            const randomNumbers = makeNonDuplicatedRandomNumbers(COUNT_NUMBERS_PER_TICKET, MIN_NUMBER, MAX_NUMBER);
            return {
                normalNumbers: randomNumbers.slice(0, randomNumbers.length - 1),
                bonusNumber: randomNumbers[randomNumbers.length - 1],
            };
        });
}

function makeNonDuplicatedRandomNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size !== count) {
        numbers.add(getRandomNumber(min, max));
    }

    return [...numbers];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
