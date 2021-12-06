import Controller from './controller.js';
import Model from './model.js';

window.onerror = function (msg) {
  alert(msg);
  return true;
};

new Controller(new Model());
