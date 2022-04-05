import inputFocusEvent from "../Controller/common/inputFocusEvent.js";

const LottoPurchaseView = (function() {
  return {
    attachInputStyleOutLine(tag) {
      inputFocusEvent.addFocusStyle(tag)
    },
    removeInputValue(tag) {
      tag.value = ''
    },
    detachInputStyleOutLine(tag) {
      inputFocusEvent.removeFocusStyle(tag)
    }
  }
})()

export default LottoPurchaseView;
