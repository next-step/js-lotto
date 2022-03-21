import { $, SELECTOR } from '../utils/selector.js';

export default function InputLottoNumbersForm({ initState }) {
  this.$inputLottoNumbersForm = $(SELECTOR.CLASS.INPUT_LOTTO_NUMBERS_FORM);
  this.$inputWinningNumbers = $(SELECTOR.CLASS.INPUT_WINNING_NUMBERS);
  this.$inputBonusNumber = $(SELECTOR.CLASS.INPUT_BONUS_NUMBER);

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { isPreviousPurchase } = this.state;
    this.$inputLottoNumbersForm.style.display = isPreviousPurchase && 'block';
  };
}
