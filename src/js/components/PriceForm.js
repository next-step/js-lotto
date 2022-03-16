const PRICE_FORM = 'price-form';
const PRICE_FORM__INPUT = 'price-form__input';
const PRICE_FORM__BUTTON = 'price-form__button';

import PriceFormButton from './PriceFormButton.js';
export default class PriceForm {
  #el;

  constructor($parent, props) {
    Object.assign(this, props);

    this.#el = document.createElement('div');
    this.#el.innerHTML = this.getHtml();

    const $btn = this.#el.querySelector(`.${PRICE_FORM__BUTTON}`);
    new PriceFormButton($btn, { onClick: this.eventHandler.PURCHASE });

    $parent.querySelector(`.${PRICE_FORM}`).append(this.#el);
  }

  getHtml = () => {
    return `<form class="mt-5 ${PRICE_FORM}">
                 <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
                     <div class="d-flex">
                         <input
                             type="number"
                             class="w-100 mr-2 pl-2 ${PRICE_FORM__INPUT}"
                             value="${this.price}"
                             placeholder="구입 금액"/>
                          <button class="${PRICE_FORM__BUTTON}"></button>       
                     </div>
             </form>`;
  };
}
