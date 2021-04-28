import SETTINGS from './settings.js';
import { $ } from './lib/utils.js';

import App from './App.js';
import { subscribe, dispatch } from './store.js';

subscribe(_ => App($.id(SETTINGS.ID.APP)));
dispatch();
