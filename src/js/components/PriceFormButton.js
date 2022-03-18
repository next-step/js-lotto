const PRICE_FORM__BUTTON = 'price-form__button';

export default class PriceFormButton {
  #el;
  constructor($target, { onClick }) {
    const $button = document.createElement('button');
    $button.innerHTML = this.getHtml();
    $button.firstChild.addEventListener('click', onClick);
    $target.replaceWith($button.firstChild);
  }

  getHtml() {
    return `<button type="button" class="btn btn-cyan price-form__button">확인</button>`;
  }
}
