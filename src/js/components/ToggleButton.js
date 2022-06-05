import { CLASS_NAME } from '../constants/index.js';

const $lottoNumbersToggleButton = document.querySelector(
    `input.${CLASS_NAME.TOGGLE_BUTTON}`
);

function ToggleButton() {
    const handleToggleButton = () => {
        const $lottoList = document.querySelector(
            `section ul.${CLASS_NAME.LOTTO_LIST}`
        );

        $lottoList.classList.toggle('flex-col');

        $lottoList
            .querySelectorAll(`span.${CLASS_NAME.LOTTO_NUMBERS}`)
            .forEach(($lottoNumbers) => $lottoNumbers.classList.toggle('show'));
    };

    $lottoNumbersToggleButton.addEventListener('change', handleToggleButton);
}

export default ToggleButton;
