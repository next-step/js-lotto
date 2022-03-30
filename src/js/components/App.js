import Lotto from './Lotto.js';
import { CLASS_NAME, NUM } from '../utils/constants.js';

const initialState = {
    lottos: [],
    purchaseCount: 0,
};

Object.freeze(initialState);

const $purchaseForm = document.querySelector(
    `form.${CLASS_NAME.PURCHASE_FORM}`
);
const $section = document.querySelector('section');
const $lottoForm = document.querySelector(`form.${CLASS_NAME.LOTTO_FORM}`);
const $lottoNumbersToggleButton = document.querySelector(
    `input.${CLASS_NAME.TOGGLE_BUTTON}`
);
const $lottos = $section.querySelector(`ul.${CLASS_NAME.LOTTO_LIST}`);

class App {
    state;

    constructor() {
        this.state = { ...initialState };

        this.Lotto = new Lotto();

        $section.style.display = 'none';
        $lottoForm.style.display = 'none';

        $purchaseForm.querySelector('input').focus();

        this.initializeEventListener();
    }

    handleToggleButton() {
        $lottos.classList.toggle('flex-col');

        $lottos
            .querySelectorAll(`span.${CLASS_NAME.LOTTO_NUMBERS}`)
            .forEach(($lottoNumbers) => $lottoNumbers.classList.toggle('show'));
    }

    handlePurchaseFormSubmit(e) {
        e.preventDefault();

        $section.style.display = 'block';
        $lottoForm.style.display = 'block';

        if ($lottoNumbersToggleButton.checked) {
            $lottoNumbersToggleButton.click();
        }

        const purchaseAmount = $purchaseForm.querySelector('input').value;
        const purchaseCount = ~~(purchaseAmount / NUM.LOTTO_PRICE);
        const lottos = this.Lotto.getMultipleLotto(purchaseCount);

        this.setState({
            ...this.state,
            purchaseCount,
            lottos,
        });
    }

    initializeEventListener() {
        $purchaseForm.addEventListener(
            'submit',
            this.handlePurchaseFormSubmit.bind(this)
        );

        $lottoNumbersToggleButton.addEventListener(
            'change',
            this.handleToggleButton.bind(this)
        );
    }

    setState(newState) {
        this.state = newState;

        this.render();
    }

    createLottoElement(lotto) {
        const $lotto = document.createElement('li');
        $lotto.classList.add('mx-1', 'text-4xl');

        const $icon = document.createElement('span');
        $icon.textContent = '🎟️';

        const $lottoNumbers = document.createElement('span');
        $lottoNumbers.textContent = lotto.join(', ');
        $lottoNumbers.classList.add(CLASS_NAME.LOTTO_NUMBERS);

        $lotto.append($icon, $lottoNumbers);

        return $lotto;
    }

    render() {
        const { purchaseCount, lottos } = this.state;

        const $label = $section.querySelector(
            `label.${CLASS_NAME.SECTION_TITLE_LABEL}`
        );
        $label.textContent = `총 ${purchaseCount}개를 구매하였습니다.`;

        $lottos.replaceChildren();
        const $lottoElements = lottos.map((lotto) =>
            this.createLottoElement(lotto)
        );
        $lottos.append(...$lottoElements);
    }
}

export default App;
