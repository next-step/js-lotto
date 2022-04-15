export const showEl = (target) => {
  if (!target instanceof HTMLElement) {
    throw Error;
  }
  target.classList.remove('hidden');
};

export const hiddenEl = (target) => {
  if (!target instanceof HTMLElement) {
    throw Error;
  }
  target.classList.add('hidden');
};
