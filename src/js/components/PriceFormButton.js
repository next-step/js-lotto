const PRICE_FORM__BUTTON = 'price-form__button';

export default class PriceFormButton {
  #el;
  constructor($target, { onClick }) {
    const $button = document.createElement('button');
    $button.innerHTML = this.getHtml().trim();
    $button.firstChild.addEventListener('click', onClick);
    $target.replaceWith($button.firstChild);
  }

  getHtml() {
    return `<button type="button" class="btn btn-cyan ${PRICE_FORM__BUTTON}">확인</button>`;
  }
}
