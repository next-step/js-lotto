import { LottoList, initParmLottoList } from "./controller/LottoList.js";
import { MyLotto, initMyLottoParam } from './controller/MyLotto.js';
import { LottoPriceInput, initLottoPriceInput } from './controller/LottoPriceInput.js';
import { LottoPurchase } from "./controller/LottoPurchase.js";
import { ResultModal, initResultModalParam } from "./controller/ResultModal.js";

import './controller/LottoPurchase.js';

import { lottoStore } from './store/LottoStore.js';
import { resultStore } from './store/ResultStore.js';

import { memoization } from './core/Memoization.js';

const memoizedLottoList = memoization(LottoList, initParmLottoList);
const memoizedMyLotto = memoization(MyLotto, initMyLottoParam);

lottoStore.subscribe((store) => {
  memoizedLottoList(store);
  memoizedMyLotto(store);
  LottoPurchase(store);
});

const memoizedLottoPurchase = memoization(LottoPriceInput, initLottoPriceInput);
const memoizedResultModal = memoization(ResultModal, initResultModalParam);

resultStore.subscribe((store) => {
  memoizedLottoPurchase(store);
  memoizedResultModal(store);
});

const lottoList = document.getElementById('lotto-list');
const lottoInput = document.getElementById('lotto-input');
lottoList.classList.add('hide');
lottoInput.classList.add('hide');
