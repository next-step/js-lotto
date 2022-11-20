import { LottoPurchase } from './view/LottoPurchase.js';
import { LottoList } from "./view/LottoList.js";
import { MyLotto } from './view/MyLotto.js';
import { ResultModal } from "./view/ResultModal.js";

import { lottoStore } from './store/LottoStore.js';
import { resultStore } from './store/ResultStore.js';

lottoStore.subscribe((store) => {
  LottoList(store);
  MyLotto(store);
});

resultStore.subscribe((store) => {
  LottoPurchase(store);
  ResultModal(store);
});

const lottoList = document.getElementById('lotto-list');
const lottoInput = document.getElementById('lotto-input');
lottoList.classList.add('hide');
lottoInput.classList.add('hide');
