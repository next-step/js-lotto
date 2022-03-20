import { CLASS } from '../const/className.js';
import { emit, $ } from '../dom/index.js';

const initializeToggleStyle = ($app, count) => {
  const $toggleNumbers = $(CLASS.TOGGLE_NUMBERS, $app);
  $toggleNumbers.checked = false;
  $toggleNumbers.disabled = count === 0;
};

const renderCount = ($app, count) => {
  const $lottoDetailCount = $(CLASS.LOTTO_COUNT, $app);
  $lottoDetailCount.textContent = `총 ${count}개를 구매하였습니다.`;
};

const LottoDetailHeader = ($app) => {
  const render = ({ size: count }) => {
    initializeToggleStyle($app, count);
    renderCount($app, count);
  };

  const toggleStyle = (show) => {
    const $el = $(CLASS.LOTTO_DETAIL_LIST, $app);
    const key = show ? 'add' : 'remove';
    $el.classList[key]('flex-column');
  };

  const onToggle = () => {
    const $toggleNumbers = $(CLASS.TOGGLE_NUMBERS, $app);
    const toggle = ({ target }) => {
      emit('@toggle', target.checked, $app);
    };

    $toggleNumbers.addEventListener('change', toggle);
  };

  return {
    render,
    bindEvents() {
      onToggle();
    },
    toggleStyle,
  };
};

export default LottoDetailHeader;
