import { $, SELECTOR } from '../utils/selector.js';

export default function MyLottoList({ initState, onToggle }) {
  this.$purchasedLottos = $(SELECTOR.CLASS.PURCHASED_LOTTOS);
  this.$purchasedLottos.style.display = 'none';
  this.$lottoNumbersToggleButton = $(SELECTOR.CLASS.LOTTO_NUMBERS_TOGGLE_BUTTON);
  this.$lottos = $(SELECTOR.CLASS.LOTTOS);

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { isPreviousPurchase, visiableLottoToggle, myLottos } = this.state;

    this.$purchasedLottos.style.display = isPreviousPurchase && 'block';
    this.$lottoNumbersToggleButton.checked = visiableLottoToggle;
    this.$lottos.innerHTML = myLottos
      ?.map(
        (lotto) =>
          `<li class="mx-1 test-4xl lotto-wrapper">
            <span data-test="lotto-icon" class="lotto-icon">🎟️ </span>
            <span data-test="lotto-detail" class="lotto-detail" style="display: ${
              visiableLottoToggle ? 'inline;' : 'none;'
            }">
              ${lotto.join(', ')}
            </span>
          </li>`
      )
      .join('');
  };

  this.toggleLottoNumberButton = (event) => {
    const toggle = event.target.checked;
    onToggle(toggle);
  };

  this.$lottoNumbersToggleButton.addEventListener('click', this.toggleLottoNumberButton);
}
