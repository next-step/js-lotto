import { $ } from '../utils/dom.js';
import { SELECTOR } from '../utils/constants.js';
let template;

const getTemplate = () => {
  if (!template) {
    template = $('#lotto-app');
  }
  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, events) => {
  $(SELECTOR.PURCHASE_FORM, targetElement).addEventListener(
    'submit',
    (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const purchaseAmount = formData.get('purchase-amount');
      events.purchaseLotto(purchaseAmount);
    }
  );
};

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true);
  newApp.innerHTML = '';
  newApp.appendChild(getTemplate());
  addEvents(newApp, events);
  return newApp;
};
