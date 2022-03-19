import { CLASS } from './const/className.js';
import { $, on, emit, $Curry } from './dom/index.js';
import { buy } from './service/index.js';

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
    emit('@toggle-numbers', target.checked, $clonedApp);
  };

  $toggleNumbers.addEventListener('change', onToggle);
};

const renderer =
  ($clonedApp) =>
  (...components) =>
    components.forEach(([$el, handler]) => handler($el, $clonedApp));

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

  on(
    '@buy',
    ({ detail }) => {
      const { numbers, size } = buy(detail);
      $lottoDetailCount.textContent = `총 ${size}개를 구매하였습니다.`;
      const $clonedList = $lottoDetailList.cloneNode();
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
      $lottoDetailList.parentNode.replaceChild($clonedList, $lottoDetailList);

      $toggleNumbers.checked = false;
      $toggleNumbers.disabled = size === 0;
      $clonedList.classList.remove('flex-column');

      App();
    },
    $clonedApp
  );

  on(
    '@toggle-numbers',
    ({ detail }) => {
      const key = detail ? 'add' : 'remove';
      $lottoDetailList.classList[key]('flex-column');
    },
    $clonedApp
  );
  return $app.parentNode.replaceChild($clonedApp, $app);
};

export default App;
