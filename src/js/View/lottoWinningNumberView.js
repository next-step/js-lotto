import { selector, selectorAll } from '../utils/consts.js';

const LottoWinningNumberView = (function () {
  return {
    initWinningNumberInputValue() {
      [...selectorAll('.winning-number'), selector('.bonus-number')].forEach(
        (tag) => (tag.value = '')
      );
    },
  };
})();

export default LottoWinningNumberView;
