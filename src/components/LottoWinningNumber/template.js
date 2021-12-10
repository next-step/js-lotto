export const inputTemplate = (num) => {
  return `<input
    name="win-num"
    value="${num || ""}"
    type="number"
    class="winning-number mx-1 text-center"
    max="45"
    data-cy="input-win-num"
  />`;
};
