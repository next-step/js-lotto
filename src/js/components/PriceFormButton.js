export default class PriceFormButton {
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
