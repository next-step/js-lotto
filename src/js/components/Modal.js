import Component from '../core/Component.js';
import { $ } from '../utils/dom.js';

class Modal extends Component {
  setEvent() {
    $('.open-result-modal-button').addEventListener('click', this.onModalShow.bind(this));
    $('.modal-close').addEventListener('click', this.onModalClose.bind(this));
  }

  onModalShow() {
    $('.modal').classList.add('open');
  }

  onModalClose() {
    $('.modal').classList.remove('open');
  }
}

export default Modal;
