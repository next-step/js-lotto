import SETTINGS from './settings.js';
import { $, warn } from './utils.js';

import App from './App.js';

try {
  App($.id(SETTINGS.ID.APP));
} catch (e) {
  warn(e);
}
