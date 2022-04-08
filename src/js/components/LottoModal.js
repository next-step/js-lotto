import Component from '../core/Component.js';
import { getPriceRate } from '../domains/index.js';
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
    addEvent('click', 'button[type="button"]', () => {
      reStart();
      this.render();
    });
  }

  render() {
    this.$target.innerHTML = getModalTemplate(this.$props.store.state);
  }

  closeModal() {
    $('.modal').classList.toggle('show-modal');
    $('#form-winning').classList.add('hidden');
  }
}

export default LottoModal;
