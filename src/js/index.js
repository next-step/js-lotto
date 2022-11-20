import './components/LottoPurchaseController.js';
import { LottoList } from "./components/LottoList.js";
import { ResultModal } from "./components/ResultModal.js";
import { MyLottoInput } from './components/MyLottoInputController.js';
import { lottoStore } from './store/LottoStore.js';
import { resultStore } from './store/ResultStore.js';

lottoStore.subscribe((store) => {
  const { lottos, isShowLottoNumbers } = store;
  LottoList(lottos, isShowLottoNumbers);
  MyLottoInput(lottos);
});

resultStore.subscribe((store) => {
  ResultModal(store);
});

const lottoSection = document.getElementById('lotto-section');
const lottoInput = document.getElementById('lotto-input');

// lottoSection.classList.add('hide');
// lottoInput.classList.add('hide');
