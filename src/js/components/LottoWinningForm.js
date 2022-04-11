import { $, addEvent } from '../utils/index.js';
import { getModalTemplate, getWinningFormTemplate } from './Template.js';
class LottoWinningForm {
  constructor($target, $props) {
    this.$props = $props;
    this.$target = $target;
    this.setEvent();

    $target.innerHTML = getWinningFormTemplate($props.store.state);
  }

  setEvent() {
    const { handleSubmitFormWinning } = this.$props;

    addEvent('submit', '#form-winning', handleSubmitFormWinning);
    addEvent('input', '#winning-input', this.changeInput);
  }

  changeInput({ target }) {
    const value = target.value;
    const index = Number(target.dataset.winningNumberIndex);

    if (value.length > 1) {
      document.querySelector(`[data-winning-number-index='${index + 1}']`)?.focus();
    }
  }

  render() {
    const { state } = this.$props.store;

    $('.modal').innerHTML = getModalTemplate(state);
    this.$target.innerHTML = getWinningFormTemplate(state);
  }
}

export default LottoWinningForm;
