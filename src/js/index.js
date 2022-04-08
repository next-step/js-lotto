import App from './app.js';
import Store from './store/index.js';

const store = new Store();

new App(document.querySelector('#app'), store);
