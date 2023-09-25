export const $ = (selectors) => document.querySelector(selectors);

export const showElement = (element) => element.classList.remove('d-none');

export const hideElement = (element) => element.classList.add('d-none');

export const removeAllChild = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
