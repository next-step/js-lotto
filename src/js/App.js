import { CLASS } from './const/className.js';
import { $, on, emit, $Curry } from './dom/index.js';
import { buy } from './service/index.js';
import stateWrapper from './store/stateWrapper.js';

const initialState = {
  lotto: {
    numbers: [],
    size: 0,
  },
};

const onSubmitEvent = ($moneyForm, $clonedApp) => {
  const onSubmitMoney = (event) => {
    event.preventDefault();
    const money = Number($(CLASS.MONEY, $moneyForm)?.value ?? 0);
    emit('@buy', money, $clonedApp);
  };

  $moneyForm.addEventListener('submit', onSubmitMoney);
};

const onToggleEvent = ($toggleNumbers, $clonedApp) => {
  const onToggle = ({ target }) => {
    emit('@toggle', target.checked, $clonedApp);
  };

  $toggleNumbers.addEventListener('change', onToggle);
};

const renderer =
  ($clonedApp) =>
  (...components) =>
    components.forEach(([$el, handler]) => handler($el, $clonedApp));

const renderCount = ($el, count) => {
  $el.textContent = `총 ${count}개를 구매하였습니다.`;
};

const renderLottoList = ($el, numbers) => {
  const $clonedList = $el.cloneNode();
  $clonedList.insertAdjacentHTML(
    'afterBegin',
    numbers
      .map(
        (lotto) => `
          <li>
            <span class="mx-1 text-4xl lotto-icon">🎟️ </span>
            <span class="lotto-detail">${lotto}</span>
          </li>`
      )
      .join('')
  );
  $clonedList.classList.remove('flex-column');
  $el.parentNode.replaceChild($clonedList, $el);
};

const handleToggleInitialStyle = ($el, count) => {
  $el.checked = false;
  $el.disabled = count === 0;
};

const handleToggleStyle = ($el, show) => {
  const key = show ? 'add' : 'remove';
  $el.classList[key]('flex-column');
};

const onCurry =
  ($app) =>
  (...events) =>
    on(...events, $app);

const App = () => {
  const $app = $(CLASS.APP);
  const $clonedApp = $app.cloneNode(true);
  const $find = $Curry($clonedApp);
  const $moneyForm = $find(CLASS.MONEY_FORM);
  const $lottoDetailCount = $find(CLASS.LOTTO_COUNT);
  const $lottoDetailList = $find(CLASS.LOTTO_DETAIL_LIST);
  const $toggleNumbers = $find(CLASS.TOGGLE_NUMBERS);

  const render = renderer($clonedApp);
  render([$moneyForm, onSubmitEvent], [$toggleNumbers, onToggleEvent]);

  const state = stateWrapper(initialState, () => {
    const { size, numbers } = state.lotto;

    renderCount($lottoDetailCount, size);
    renderLottoList($lottoDetailList, numbers);
    handleToggleInitialStyle($toggleNumbers, size);

    App();
  });

  const on = onCurry($clonedApp);

  on('@buy', ({ detail }) => (state.lotto = buy(detail)));

  on('@toggle', ({ detail }) => handleToggleStyle($lottoDetailList, detail));

  return $app.parentNode.replaceChild($clonedApp, $app);
};

export default App;
