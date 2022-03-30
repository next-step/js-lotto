export function makeNonDuplicatedRandomNumbers(count, min, max) {
    const numbers = Array.from({
            length: max - min + 1,
        },
        (_, i) => min + i
    );
    numbers.sort(() => Math.random() - 0.5);
    return numbers.slice(0, count);
}

export default makeNonDuplicatedRandomNumbers;