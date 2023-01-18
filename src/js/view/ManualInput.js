import { LOTTO_LENGTH, LOTTO_NUMBER, LOTTO_PRICE } from '../service/Constant.js';
import { MANUAL_NUMBER_INPUT } from './Element.js';
import { onLottoNumberInput } from './Listener.js';
import { $manualNumberList } from './Selector.js';

/**
 *
 * @returns {number}
 */
export const getCountOfBuyingManually = () => {
  return $manualNumberList.querySelectorAll('li').length;
};

/**
 *
 * @param {number} manualNumberItemLength
 * @returns {number}
 */
export const getPriceOfBuyingManually = (manualNumberItemLength) => {
  return manualNumberItemLength * LOTTO_PRICE;
};

export const appendLottoNumberInputs = () => {
  const inputs = Array.from({ length: LOTTO_LENGTH }).map(
    () => `<input type="text" class="manual-number mx-1 mb-3 text-center" required />`
  );
  const button = `<button type="button" class="btn btn-pink w-10 mx-1">삭제</button>`;
  const li = document.createElement('li');
  li.innerHTML += `
    ${inputs.join('')}
    ${button}
 `;
  li.querySelector('button').addEventListener('click', function () {
    this.parentElement.remove();
  });
  $manualNumberList.appendChild(li);
  li.querySelectorAll('.manual-number').forEach((input) => input.addEventListener('keypress', onLottoNumberInput));
};

export const truncateLottoNumberInput = () => {
  $manualNumberList.innerHTML = '';
};

/**
 * @returns {number[]}
 */
export const getLottoManualNumberLottos = () => {
  const items = Array.from($manualNumberList.querySelectorAll('li'));
  if (items.length === 0) return [];
  return items.map(($li) => {
    const inputs = Array.from($li.querySelectorAll(MANUAL_NUMBER_INPUT));
    return inputs.map(({ value }) => value).map(Number);
  });
};
