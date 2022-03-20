import Component from '../core/Component.js';
import { $ } from '../utils/dom.js';

class Modal extends Component {
  setEvent() {
    $('.open-result-modal-button').onclick = this.onModalClose.bind(this);
    $('.modal-close').onclick = this.onModalClose.bind(this);
  }

  onModalShow() {
    $('.modal').classList.add('open');
  }

  onModalClose() {
    $('.modal').classList.remove('open');
  }
}

export default Modal;
