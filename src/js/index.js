import App from './app.js';
import { $ } from './utils/utils.js';

const container = $({ selector: '#app' });
new App(container);
