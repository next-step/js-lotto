import { LottoPurchase } from './components/LottoPurchase.js';
import { LottoList } from "./components/LottoList.js";
import { MyLotto } from './components/MyLotto.js';
import { ResultModal } from "./components/ResultModal.js";

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

const lottoSection = document.getElementById('lotto-section');
const lottoInput = document.getElementById('lotto-input');
lottoSection.classList.add('hide');
lottoInput.classList.add('hide');
