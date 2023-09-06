import { Modal } from '../../components';

export const OutputViewWeb = {
  render(targetSelector, children) {
    const targetElement = document.querySelector(targetSelector);

    targetElement.innerHTML = children;
  },

  openModal(children) {
    const portalElement = document.querySelector('#portal');

    portalElement.innerHTML = Modal(children);
  },
};
