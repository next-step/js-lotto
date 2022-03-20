import Lotto from './Lotto.js';
import { CLASS_NAME, NUM } from '../utils/constants.js';

const initialState = {
    lottos: [],
    purchaseCount: 0,
};

class App {
    state;
    $purchaseForm;
    $section;
    $lottoForm;

    constructor() {
        this.state = { ...initialState };
        this.$purchaseForm = document.querySelector(
            `form.${CLASS_NAME.PURCHASE_FORM}`
        );
        this.$section = document.querySelector('section');
        this.$lottoForm = document.querySelector(
            `form.${CLASS_NAME.LOTTO_FORM}`
        );
        this.$lottoNumbersToggleButton = document.querySelector(
            `input.${CLASS_NAME.TOGGLE_BUTTON}`
        );
        this.$lottos = this.$section.querySelector(
            `ul.${CLASS_NAME.LOTTO_LIST}`
        );

        this.Lotto = new Lotto();

        this.initialize();
    }

    handleToggleButton(e) {
        const isShowLottoNumbers = e.target.checked;

        if (isShowLottoNumbers) {
            this.$lottos.classList.add('flex-col');
        } else {
            this.$lottos.classList.remove('flex-col');
        }

        this.$lottos
            .querySelectorAll(`span.${CLASS_NAME.LOTTO_NUMBERS}`)
            .forEach(
                ($lottoNumbers) =>
                    ($lottoNumbers.style.display = isShowLottoNumbers
                        ? 'inline'
                        : 'none')
            );
    }

    handlePurchaseFormSubmit(e) {
        e.preventDefault();

        this.$section.style.display = 'block';
        this.$lottoForm.style.display = 'block';
        if (this.$lottoNumbersToggleButton.checked) {
            this.$lottoNumbersToggleButton.click();
        }

        const purchaseAmount = this.$purchaseForm.querySelector('input').value;
        const purchaseCount = ~~(purchaseAmount / NUM.LOTTO_PRICE);
        const lottos = this.Lotto.getMultipleLotto(purchaseCount);

        this.setState({
            ...this.state,
            purchaseCount,
            lottos,
        });
    }

    initialize() {
        this.$section.style.display = 'none';
        this.$lottoForm.style.display = 'none';

        this.$purchaseForm.querySelector('input').focus();

        this.$purchaseForm.addEventListener(
            'submit',
            this.handlePurchaseFormSubmit.bind(this)
        );

        this.$lottoNumbersToggleButton.addEventListener(
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
        $lottoNumbers.style.display = 'none';

        $lotto.appendChild($icon);
        $lotto.appendChild($lottoNumbers);

        return $lotto;
    }

    render() {
        const { purchaseCount, lottos } = this.state;

        const $label = this.$section.querySelector(
            `label.${CLASS_NAME.SECTION_TITLE_LABEL}`
        );
        $label.textContent = `총 ${purchaseCount}개를 구매하였습니다.`;

        this.$lottos.replaceChildren();
        lottos.forEach((lotto) => {
            const $lotto = this.createLottoElement(lotto);

            this.$lottos.appendChild($lotto);
        });
    }
}

export default App;
