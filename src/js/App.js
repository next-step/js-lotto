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

export default () => {
  const $app = $Curry()(CLASS.APP);
  const store = createStore(initialState);

  const controllers = [LottoController, WinningController];
  controllers.forEach((controller) => controller($app, store));
};
