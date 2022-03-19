import { emit } from '../dom/index.js';

const toggleInitialStyle = ($el, count) => {
  $el.checked = false;
  $el.disabled = count === 0;
};

const toggleStyle = ($el, show) => {
  const key = show ? 'add' : 'remove';
  $el.classList[key]('flex-column');
};

const onToggle = ($toggleNumbers, $clonedApp) => {
  const onToggle = ({ target }) => {
    emit('@toggle', target.checked, $clonedApp);
  };

  $toggleNumbers.addEventListener('change', onToggle);
};

const render = ($el, count) => {
  $el.textContent = `총 ${count}개를 구매하였습니다.`;
};

export default {
  toggleInitialStyle,
  toggleStyle,
  onToggle,
  render,
};
