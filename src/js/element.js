export const hideElement = ($element) => {
  $element.style.display = 'none';
};

export const showElement = ($element) => {
  $element.style.display = 'block';
};

export const setValue = ($element, value) => {
  const textNode = document.createTextNode(value);
  $element.appendChild(textNode);
};

export const setClass = ($element, value) => {
  $element.setAttribute('class', value);
};
