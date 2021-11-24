import Controller from './controller.js';
import Model from './model.js';
import View from './view/view.js';

// window.onerror = function (msg) {
//   alert(msg);
//   return true;
// };

new Controller(new Model(), new View());
