export const setValue = ($element, value) => {
  const textNode = document.createTextNode(value);
  $element.appendChild(textNode);
};
