export default class PriceFormButton {
  constructor($target, { onClick }) {
    const $button = document.createElement('button');
    $button.innerHTML = PriceFormButton.getHtml();
    $button.firstChild.addEventListener('click', onClick);
    $target.replaceWith($button.firstChild);
  }

  static getHtml() {
    return `<button type="button" class="btn btn-cyan price-form__button">확인</button>`;
  }
}
