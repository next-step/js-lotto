import Model from './model.js';
import View from './view/view.js';
import Controller from "./controller.js";

// window.onerror = function (msg) {
//   alert(msg);
//   return true;
// };

document.addEventListener('DOMContentLoaded', () =>{
  const app = new Controller(new Model(), new View());
  }
);
