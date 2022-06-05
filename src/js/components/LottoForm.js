import { CLASS_NAME } from '../constants/index.js';

const $lottoForm = document.querySelector(`form.${CLASS_NAME.LOTTO_FORM}`);
const $winningNumbers = document.querySelectorAll(
    `input.${CLASS_NAME.WINNING_NUMBER}`
);
const $bonusNumber = document.querySelector(`input.${CLASS_NAME.BONUS_NUMBER}`);
const $modal = document.querySelector('.modal');

function LottoForm({ setRankingTable }) {
    const handleLottoFormSubmit = (e) => {
        e.preventDefault();

        const winningNumbers = [];
        $winningNumbers.forEach(($winningNumber) =>
            winningNumbers.push($winningNumber.valueAsNumber)
        );
        const bonusNumber = $bonusNumber.valueAsNumber;

        setRankingTable({ bonusNumber, winningNumbers });

        $modal.classList.add('open');
    };

    $lottoForm.addEventListener('submit', handleLottoFormSubmit);
}

export default LottoForm;
