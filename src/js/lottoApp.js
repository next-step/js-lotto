'use strict';

// import { lottoAppContainer } from './utils/templates.js';

import { $, $$ } from './utils/dom.js';
import LottoPriceInput from './components/lottoPriceInput.js';
import LottoPurchasedList from './components/lottoPurchasedList.js';
import LottoNumberInput from './components/lottoNumberInput.js';
import LottoResultModal from './components/lottoResultModal.js';

class LottoApp {
  constructor() {
    this.lottoPriceInput = new LottoPriceInput();
    this.lottoPurchasedList = new LottoPurchasedList();
    this.lottoNumberInput = new LottoNumberInput();
    this.lottoResultModal = new LottoResultModal();

    this.lottoPriceInput.setRenderLottoList(numberOfLottto => {
      this.lottoPurchasedList.init(numberOfLottto);
      this.lottoNumberInput.init();
    });

    this.lottoNumberInput.setRenderResultModal(() => {
      this.lottoResultModal.open();
    });
  }
}

export default LottoApp;
