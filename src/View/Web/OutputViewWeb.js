export const OutputViewWeb = {
  render(targetSelector, children) {
    const targetElement = document.querySelector(targetSelector);

    targetElement.innerHTML = children;
  },
};
