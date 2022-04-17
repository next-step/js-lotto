import { CLASS_NAME } from '../constants/index.js';

const $winningNumbers = document.querySelectorAll(
    `input.${CLASS_NAME.WINNING_NUMBER}`
);
const $bonusNumber = document.querySelector(`input.${CLASS_NAME.BONUS_NUMBER}`);

function WinningNumberInputs() {
    const handleKeyUp = (e) => {
        const { target: input } = e;

        const nextInput = input.nextElementSibling;
        const isLengthOverTwo = input.value.length >= 2;

        if (!isLengthOverTwo) {
            return;
        }

        if (!nextInput) {
            $bonusNumber.focus();
            return;
        }

        nextInput.focus();
    };

    $winningNumbers.forEach(($winningNumber) => {
        $winningNumber.addEventListener('keyup', handleKeyUp);
    });
}

export default WinningNumberInputs;
