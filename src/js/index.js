import LottoApp from './app.js';
import { DOM } from './constants.js';
import { $ } from './utils/dom.js';

new LottoApp($(`#${DOM.APP_ID}`));
