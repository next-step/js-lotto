import inputFocusEvent from '../Controller/common/inputFocusEvent.js';
import { selector } from '../utils/consts.js';

const LottoPurchaseView = (function () {
  return {
    attachInputStyleOutLine(tag) {
      inputFocusEvent.addFocusStyle(tag);
    },
    removeInputValue() {
      selector('.lotto-purchase-input').value = '';
    },
    detachInputStyleOutLine(tag) {
      inputFocusEvent.removeFocusStyle(tag);
    },
  };
})();

export default LottoPurchaseView;
