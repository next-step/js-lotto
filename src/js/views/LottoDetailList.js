import { CLASS } from '../const/className.js';
import {
  toggleClassName,
  replaceChild,
  $,
  insertAdjacentHTML,
} from '../dom/index.js';

const getLottoTemplate = (lotto) => `
  <li>
    <span class="mx-1 text-4xl lotto-icon">🎟️ </span>
    <span class="lotto-detail">${lotto}</span>
  </li>`;

const LottoDetailList = ($app) => {
  const render = ({ numbers }) => {
    const $el = $(CLASS.LOTTO_DETAIL_LIST, $app);
    const $clonedList = $el.cloneNode();

    insertAdjacentHTML($clonedList, numbers.map(getLottoTemplate).join(''));
    toggleClassName($clonedList, 'remove', 'flex-column');
    replaceChild($el, $clonedList);
  };

  return { render };
};

export default LottoDetailList;
