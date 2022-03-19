import { CLASS } from './const/className.js';
import { $, on, emit } from './dom/index.js';
import { buy } from './service/index.js';

const App = () => {
  const $app = $(CLASS.APP);
  const $clonedApp = $app.cloneNode(true);
  const $moneyForm = $(CLASS.MONEY_FORM, $clonedApp);
  const $lottoDetailCount = $(CLASS.LOTTO_COUNT, $clonedApp);
  const $lottoDetailList = $(CLASS.LOTTO_DETAIL_LIST, $clonedApp);
  const $toggleNumbers = $(CLASS.TOGGLE_NUMBERS, $clonedApp);

  const onSubmitMoney = (event) => {
    event.preventDefault();
    const money = Number($(CLASS.MONEY, $moneyForm)?.value ?? 0);
    emit('@buy', money, $clonedApp);
  };

  $moneyForm.addEventListener('submit', onSubmitMoney);

  const onToggle = ({ target }) => {
    emit('@toggle-numbers', target.checked, $clonedApp);
  };

  $toggleNumbers.addEventListener('change', onToggle);

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
