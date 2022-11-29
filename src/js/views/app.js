import { $ } from '../utils/dom.js';
let template;

const createAppElement = () => {
  if (!template) {
    template = $('#lotto-app');
  }
  return template.content.firstElementChild.cloneNode(true);
};

export default (targetElement) => {
  const newApp = targetElement.cloneNode(true);
  newApp.innerHTML = '';
  newApp.appendChild(createAppElement());
  return newApp;
};
