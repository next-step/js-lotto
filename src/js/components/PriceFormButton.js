import { PRICE_FORM__BUTTON } from '../constants/selectTarget.js';

const PriceFormButton = ($target, { onSubmit }) => {
  const getHtml = () => {
    return `<button type="submit" class="btn btn-cyan ${PRICE_FORM__BUTTON}">확인</button>`;
  };

  const $button = document.createElement('button');
  $button.innerHTML = getHtml();
  $button.firstChild.addEventListener('click', onSubmit);
  $target.replaceWith($button.firstChild);
};
export default PriceFormButton;
