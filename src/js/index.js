import Controller from './Controller.js';
import storage from './storage.js';
import Store from './Store.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
  const store = new Store(storage);

  const views = {};

  new Controller(store, views);
}
