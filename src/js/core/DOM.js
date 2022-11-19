export function createElement(elementType, { onClick, children }) {
  const newElement = document.createElement(elementType);
  onClick && newElement.addEventListener('click', onClick);
  children && newElement.appendChild(children);

  return newElement;
}

export function createTextNode(text) {
  const newNode = document.createTextNode(text);

  return newNode;
}
