import { myLottoInputView } from '../view/MyLottoInputView.js';

export const initMyLottoParam = { isShow: false };

export function MyLotto({ isShow } = initMyLottoParam) {
  if (!isShow) {
    myLottoInputView.hide();
    return;
  }

  myLottoInputView.show();
}
