import { $, addEvent } from '../utils/index.js';
import { getModalTemplate } from './Template.js';

class LottoModal {
  constructor($target, $props) {
    this.$props = $props;
    this.$target = $target;
    this.setEvent();

    $target.innerHTML = getModalTemplate($props.store.state);
  }

  setEvent() {
    const { reStart } = this.$props;

    addEvent('click', '.modal-close', this.closeModal);
    addEvent('click', '.modal button[type="button"]', reStart);
  }

  render() {
    this.$target.innerHTML = getModalTemplate(this.$props.store.state);
  }

  closeModal() {
    $('.modal').classList.toggle('show-modal');
  }
}

export default LottoModal;
