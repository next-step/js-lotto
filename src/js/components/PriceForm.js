const PRICE_FORM = 'price-form';
const PRICE_FORM__INPUT = 'price-form__input';
const PRICE_FORM__BUTTON = 'price-form__button';

export default class PriceForm {
  #el;
  #state;

  constructor(props = { state: { price: '' } }) {
    const { state } = props;
    this.#state = state || { price: '' };
    this.#el = document.createElement('form');
    this.#el.innerHTML = this.getHtml();
  }

  getHtml = () => {
    return `<form class="mt-5 ${PRICE_FORM}">
                 <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
                     <div class="d-flex">
                         <input
                             type="number"
                             class="w-100 mr-2 pl-2 ${PRICE_FORM__INPUT}"
                             value="${this.#state.price || ''}"
                             placeholder="구입 금액"/>
                         <button type="button" class="btn btn-cyan ${PRICE_FORM__BUTTON}">확인</button>
                     </div>
             </form>`;
  };
}
