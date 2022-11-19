export function createElement(elementType, { onClick, className, children = [] }) {
  const newElement = document.createElement(elementType);
  onClick && newElement.addEventListener('click', onClick);
  if (className) { newElement.className = className; }
  if (children && children.length > 0) {
    newElement.append(...children);
  }

  return newElement;
}

export function createTextNode(text) {
  const newNode = document.createTextNode(text);

  return newNode;
}
