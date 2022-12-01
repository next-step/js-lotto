export default (targetElement, { lottos }) => {
  const newCounter = targetElement.cloneNode(true);
  newCounter.textContent = lottos.length;

  return newCounter;
};
