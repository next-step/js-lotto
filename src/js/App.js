import { CLASS } from './const/className.js';
import { $Curry } from './dom/index.js';

import LottoController from './controller/LottoController.js';
import WinningController from './controller/WinningController.js';
import createStore from './store/index.js';

const initialState = {
  lotto: {
    numbers: [],
    count: 0,
  },
};

const controllers = [LottoController, WinningController];

export default () => {
  const $app = $Curry()(CLASS.APP);
  const store = createStore(initialState);

  controllers.forEach((controller) => controller($app, store));
};
