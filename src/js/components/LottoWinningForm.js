import { errorPrintAlert, validateWinningNumber } from '../domains/errors.js';
import { getRankBoard, getWinningNumber } from '../domains/index.js';
import { $, addEvent } from '../utils/index.js';
import { hiddenEl, showEl } from '../view/common.js';
import { getModalTemplate, getWinningFormTemplate } from './Template.js';
class LottoWinningForm {
  constructor($target, $props) {
    this.$props = $props;
    this.$target = $target;
    this.setEvent();

    $target.innerHTML = getWinningFormTemplate($props.store.state);
  }

  setEvent() {
    addEvent('submit', '#form-winning', this.handleSubmitFormWinning);
    addEvent('input', '#winning-input', this.handleChangeInput);
  }

  handleChangeInput({ target }) {
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

  updateView() {
    this.render();
    showEl($('.modal'));
  }

  reset() {
    this.render();
    hiddenEl($('.modal'));
  }

  setRankBoardState(e) {
    const { state, setState } = this.$props.store;
    const winningNumber = getWinningNumber(e.target['winning-number']);
    const { errorMsg } = validateWinningNumber(winningNumber);

    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }

    const rankBoard = getRankBoard({ lottoList: state.lottoList, winningNumber });

    setState({
      winningNumber,
      rankBoard,
    });
  }

  handleSubmitFormWinning = (e) => {
    e.preventDefault();

    this.setRankBoardState(e);
    this.updateView();
  };
}

export default LottoWinningForm;
