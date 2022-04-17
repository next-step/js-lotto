import { CLASS_NAME } from '../constants/index.js';

const $section = document.querySelector('section');
const $lottoForm = document.querySelector(`form.${CLASS_NAME.LOTTO_FORM}`);
const $lottoNumbersToggleButton = document.querySelector(
    `input.${CLASS_NAME.TOGGLE_BUTTON}`
);
const $purchaseForm = document.querySelector(
    `form.${CLASS_NAME.PURCHASE_FORM}`
);

function PurchaseForm({ purchaseLottos }) {
    const handlePurchaseFormSubmit = (e) => {
        e.preventDefault();

        $section.style.display = 'block';
        $lottoForm.style.display = 'block';

        if ($lottoNumbersToggleButton.checked) {
            $lottoNumbersToggleButton.click();
        }

        purchaseLottos();
    };

    $purchaseForm.addEventListener('submit', handlePurchaseFormSubmit);
}

export default PurchaseForm;
