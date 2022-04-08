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

    addEvent('submit', '#form-winning', (e) => {
      handleSubmitFormWinning(e);
      this.render();
    });
    addEvent('input', '#winning-input', this.changeInput);
  }

  changeInput({ target }) {
    const value = target.value;
    const $winningBonusInput = $('input.bonus-number');
    if (value.length > 1) {
      target.nextElementSibling ? target.nextElementSibling.focus() : $winningBonusInput.focus();
    }
  }

  render() {
    const { state } = this.$props.store;

    $('.modal').classList.toggle('show-modal');
    $('.modal').innerHTML = getModalTemplate(state);
    this.$target.innerHTML = getWinningFormTemplate(state);
  }
}

export default LottoWinningForm;
