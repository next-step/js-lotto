import { lottoPurchaseInputView } from "../view/LottoPurchaseInputView.js";

export const initLottoPurchaseParam = { isShow: false };

export function LottoPurchase({ isShow }) {
  if (!isShow) {
    lottoPurchaseInputView.hide();
    return;
  }

  lottoPurchaseInputView.initLocalPurchaseInputView();
}
