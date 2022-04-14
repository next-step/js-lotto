import { CLASS } from './const/className.js';
import { $Curry } from './dom/index.js';

import LottoController from './controller/LottoController.js';
import createStore from './state/index.js';

const initialState = {
  lotto: {
    numbers: [],
    count: 0,
  },
  winning: {
    results: [],
    rate: 0,
  },
  reset: true,
};

export default () => {
  const $app = $Curry()(CLASS.APP);
  const store = createStore(initialState);

  new LottoController($app, store);
};
