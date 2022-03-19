import { CLASS } from '../const/className.js';
import { emit, $ } from '../dom/index.js';

const toggleInitialStyle = ($el, count) => {
  $el.checked = false;
  $el.disabled = count === 0;
};

const toggleStyle = ($app, show) => {
  const $el = $(CLASS.LOTTO_DETAIL_LIST, $app);
  const key = show ? 'add' : 'remove';
  $el.classList[key]('flex-column');
};

const onToggle = ($app) => {
  const $toggleNumbers = $(CLASS.TOGGLE_NUMBERS, $app);
  const toggle = ({ target }) => {
    emit('@toggle', target.checked, $app);
  };

  $toggleNumbers.addEventListener('change', toggle);
};

const render = ($el, { size: count }) => {
  const $lottoDetailCount = $(CLASS.LOTTO_COUNT, $el);
  const $toggleNumbers = $(CLASS.TOGGLE_NUMBERS, $el);
  toggleInitialStyle($toggleNumbers, count);
  $lottoDetailCount.textContent = `총 ${count}개를 구매하였습니다.`;
};

export default {
  toggleInitialStyle,
  toggleStyle,
  bindEvents(...args) {
    onToggle(...args);
  },
  render,
};
