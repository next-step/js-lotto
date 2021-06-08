import SETTINGS from '../settings.js';
import { $, uuidV4 } from '../lib/utils.js';

const Modal = (({ KLASS, EVENT }) => {
  return ($el, isOpen, onClose, InnerComponent) => {
    if (!isOpen) {
      $el.classList.remove(KLASS.MODAL_OPEN);
      $el.innerHTML = '';
      return;
    }

    const bindEvent = $el => {
      const $close = $.klass(KLASS.MODAL_CLOSE, $el);
      $close.addEventListener(EVENT.CLICK, onClose);

      $el.addEventListener(EVENT.CLICK, ({ target }) => {
        if (target === $el) $close.click();
      });
    };

    const render = $el => {
      const innerComponentId = uuidV4();

      $el.innerHTML = `
        <div class="modal-inner p-10">
          <div class="${KLASS.MODAL_CLOSE}">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </div>
          <div id="${innerComponentId}"></div>
        </div>
      `;

      InnerComponent($.id(innerComponentId, $el));
    };

    render($el);
    bindEvent($el);
    $el.classList.add(KLASS.MODAL_OPEN);
  };
})(SETTINGS);

export default Modal;
