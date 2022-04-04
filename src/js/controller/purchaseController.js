import { $ } from '../utils/selector.js';
import {
  insertLottoElement,
  insertPurchaseCompletedMessage,
  isPurchasedLotto,
  removePurchasedLotto,
  resetDisplay,
  showResultContainer,
  toggleLottoNumbers,
} from '../view/view.js';
import LottoManager from '../model/LottoManager.js';

export const purchaseLotto = (e) => {
  e.preventDefault();
  const lottoManager = new LottoManager(Number($('#input-price').value));
  const { lottos } = lottoManager;

  if (!lottos) return;

  if (isPurchasedLotto()) {
    removePurchasedLotto();
    resetDisplay();
  }
  showResultContainer();
  console.log(lottos.length);
  insertPurchaseCompletedMessage(lottos.length);
  lottos.forEach((lotto) => {
    insertLottoElement([...lotto.lottoNumbers]);
  });
};

export const clickLottoNumbersToggle = () => {
  toggleLottoNumbers();
};
