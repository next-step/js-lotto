import { LottoList } from "./components/LottoList.js";
import './LottoPurchaseController.js';
import './MyLottoInputController.js';
import { lottoStore } from './store/LottoStore.js';

const lottoListRoot = document.getElementById('lotto-list');
lottoStore.subscribe((store) => {
  lottoListRoot.appendChild(LottoList(store.lottos));
});

const mt9s = Array.from(document.getElementsByClassName('mt-9'));
mt9s.forEach((el) => {
  // el.classList.add('hide');
});
