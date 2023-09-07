export const OutputViewWeb = {
  render(targetSelector, children) {
    const targetElement = document.querySelector(targetSelector);

    targetElement.innerHTML = children;
  },

  clear(targetSelector) {
    const targetElement = document.querySelector(targetSelector);

    targetElement.innerHTML = null;
  },
};
