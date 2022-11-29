import { LottoList, initParmLottoList } from "./view/LottoList.js";
import { MyLotto, initMyLottoParam } from './view/MyLotto.js';
import { LottoPurchase, initLottoPurchase } from './view/LottoPurchase.js';
import { ResultModal, initResultModalParam } from "./view/ResultModal.js";

import { lottoStore } from './store/LottoStore.js';
import { resultStore } from './store/ResultStore.js';

function memoization(Component, initParam) {
  const cache = { ...initParam };

  return (store) => {
    let isChange = false;
    for (const key in cache) {
      if (cache[key] === store[key]) {
        isChange = true;
      }
      cache[key] = store[key];
    }

    if (isChange) {
      Component(cache);
    }
  }
}

const memoizedLottoList = memoization(LottoList, initParmLottoList);
const memoizedMyLotto = memoization(MyLotto, initMyLottoParam);

lottoStore.subscribe((store) => {
  memoizedLottoList(store);
  memoizedMyLotto(store);
});

const memoizedLottoPurchase = memoization(LottoPurchase, initLottoPurchase);
const memoizedResultModal = memoization(ResultModal, initResultModalParam);

resultStore.subscribe((store) => {
  memoizedLottoPurchase(store);
  memoizedResultModal(store);
});

const lottoList = document.getElementById('lotto-list');
const lottoInput = document.getElementById('lotto-input');
lottoList.classList.add('hide');
lottoInput.classList.add('hide');
