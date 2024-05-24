export function getWinningNumbers() {
    const winningNumbers = [];
    const inputs = document.querySelectorAll('.winningNumbersWrapper input');
    inputs.forEach((input) => {
        winningNumbers.push(Number(input.value));
    });

    return winningNumbers;
}

export function resetWinningNumbers() {
    const inputs = document.querySelectorAll('.winningNumbersWrapper input');
    inputs.forEach((input) => {
        input.value = '';
    });
}
