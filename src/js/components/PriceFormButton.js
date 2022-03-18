import { PRICE_FORM__BUTTON } from '../constants/selectTarget.js';
export default class PriceFormButton {
  constructor($target, { onSubmit }) {
    const $button = document.createElement('button');
    $button.innerHTML = PriceFormButton.getHtml();
    $button.firstChild.addEventListener('click', onSubmit);
    $target.replaceWith($button.firstChild);
  }

  static getHtml() {
    return `<button type="submit" class="btn btn-cyan ${PRICE_FORM__BUTTON}">확인</button>`;
  }
}
