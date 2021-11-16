const MIN_NUMBER = 1;
const MAX_NUMBER = 45;
const COUNT_NUMBERS_PER_TICKET = 7;

/**
 * @param count
 * @return {Ticket[]}
 */
function autoGenerateLottoNumbers(count) {
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
    const numbers = Array.from({length: max - min + 1}, (_, i) => (min + i));
    shuffle(numbers);

    return numbers.slice(0, count);
}

function shuffle(numbers) {
    numbers.sort(() => Math.random() - 0.5);
}

export default {
    autoGenerateLottoNumbers,
};
