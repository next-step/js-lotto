import { CLASS } from './const/className.js';
import { $, onCurry, $Curry, renderer } from './dom/index.js';
import { buy } from './service/index.js';
import stateWrapper from './store/stateWrapper.js';

import MoneyForm from './views/MoneyForm.js';
import LottoDetailHeader from './views/LottoDetailHeader.js';
import LottoDetailList from './views/LottoDetailList.js';

const initialState = {
  lotto: {
    numbers: [],
    size: 0,
  },
};

const App = () => {
  const $app = $(CLASS.APP);
  const $clonedApp = $app.cloneNode(true);
  const $find = $Curry($clonedApp);

  const $moneyForm = $find(CLASS.MONEY_FORM);
  const $lottoDetailCount = $find(CLASS.LOTTO_COUNT);
  const $lottoDetailList = $find(CLASS.LOTTO_DETAIL_LIST);
  const $toggleNumbers = $find(CLASS.TOGGLE_NUMBERS);

  const state = stateWrapper(initialState, () => {
    const { size, numbers } = state.lotto;

    LottoDetailHeader.toggleInitialStyle($toggleNumbers, size);

    LottoDetailHeader.render($lottoDetailCount, size);
    LottoDetailList.render($lottoDetailList, numbers);

    App();
  });

  const render = renderer($clonedApp);
  render(
    [$moneyForm, MoneyForm.onSubmit],
    [$toggleNumbers, LottoDetailHeader.onToggle]
  );

  const on = onCurry($clonedApp);
  on('@buy', ({ detail }) => (state.lotto = buy(detail)));
  on('@toggle', ({ detail }) =>
    LottoDetailHeader.toggleStyle($lottoDetailList, detail)
  );

  return $app.parentNode.replaceChild($clonedApp, $app);
};

export default App;
