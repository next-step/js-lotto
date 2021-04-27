'use strict';

import { $, $$ } from '../utils/dom.js';
// import { isEmpty } from '../utils/validator.js';
import { lottoStore } from './store.js';

class LottoResultModal {
  constructor() {
    this.$modal = $('.modal');
    this.$modalCloseButton = $('.modal-close');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$restartButton = $('#restart-btn');
    this.$modalCloseButton.addEventListener('click', this.close);
    this.$restartButton.addEventListener('click', this.onClickRestartButton);
    this.winnigNumber = [];
  }

  open() {
    this.setWinnigNumber();
    if (!this.isFullWinnigNumber()) {
      alert('모든 항목을 입력해주세요.');
      this.winnigNumber = [];
      return;
    }
    if (!this.isOverlapWinnigNumber()) {
      alert('중복되는 숫자가 있습니다.');
      this.winnigNumber = [];
      return;
    }
    this.$modal.classList.add('open');
    this.winnigNumber = [];
  }

  close = () => {
    this.$modal.classList.remove('open');
  };

  setWinnigNumber() {
    this.$winningNumberInputs.forEach($input => {
      if ($input.value === '') return;
      this.winnigNumber.push(Number($input.value));
    });
    if (this.$bonusNumberInput.value !== '') {
      this.winnigNumber.push(Number(this.$bonusNumberInput.value));
    }
  }

  isFullWinnigNumber() {
    if (this.winnigNumber.length !== 7) return false;
    return true;
  }

  isOverlapWinnigNumber() {
    const set = new Set(this.winnigNumber);
    if (set.size !== 7) return false;
    return true;
  }

  onClickRestartButton = () => {
    location.reload();
  };

  setLottoResult() {
    const lottoList = lottoStore.getLottoList();
    const result = {
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
    };
    lottoList.forEach(lotto => {
      const numberOfMatching = coutnMatching(lotto);
      if (numberOfMatching < 3) return;
      result[numberOfMatching]++;
    });
    console.log(result);
  }

  coutnMatching(lotto) {
    let cnt = 0;
    lotto.forEach(number => {
      if (this.winnigNumber.includes(number)) cnt++;
    });
    return cnt;
  }
}

export default LottoResultModal;
