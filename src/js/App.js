import { CLASS } from './const/className.js';
import {
  $,
  onCurry,
  rendererCurry,
  eventBinderCurry,
  replaceChild,
} from './dom/index.js';
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

  const renderer = rendererCurry(App, $clonedApp, [
    LottoDetailHeader,
    LottoDetailList,
  ]);

  const state = stateWrapper(initialState, renderer);

  const eventBinder = eventBinderCurry($clonedApp);
  eventBinder([MoneyForm, LottoDetailHeader]);

  const on = onCurry($clonedApp);
  on('@buy', ({ detail }) => {
    state.lotto = buy(detail, state);
  });
  on('@toggle', ({ detail }) =>
    LottoDetailHeader.toggleStyle($clonedApp, detail)
  );

  return replaceChild($app, $clonedApp);
};

export default App;
