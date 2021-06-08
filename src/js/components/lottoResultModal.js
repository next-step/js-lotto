'use strict';

import { $, $$ } from '../utils/dom.js';
import { isEmpty } from '../utils/validator.js';
import { lottoStore } from './store.js';
import { template } from '../utils/templates.js';

class LottoResultModal {
  constructor() {
    this.$modal = $('.modal');
    this.$modalCloseButton = $('.modal-close');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$restartButton = $('#restart-btn');
    this.$resultContainer = $('#result-container');
    this.$profitRateText = $('#profit-rate-text');

    this.$modalCloseButton.addEventListener('click', this.close);
    this.$restartButton.addEventListener('click', this.onClickRestartButton);

    this.winnigNumbers = [];
    this.bonusNumber = 0;
  }

  open() {
    if (this.isEmptyInputs() || isEmpty(this.$bonusNumberInput)) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (this.isOverlap()) {
      alert('중복 되는 숫자가 존재합니다.');
      return;
    }
    this.setWinnigAndBonusNumbers();
    const lottoResult = this.getLottoResult();
    this.renderRusult(lottoResult);
    this.renderProfitRate(lottoResult);
    this.$modal.classList.add('open');
  }

  close = () => {
    this.$modal.classList.remove('open');
  };

  renderRusult(lottoResult) {
    this.$resultContainer.innerHTML = template.result(lottoResult);
  }

  renderProfitRate(lottoResult) {
    let profit = 0;
    const cost = Number($('#lotto-price-input').value.trim());
    const profitOfRank = {
      first: 2000000000,
      second: 30000000,
      third: 1500000,
      fourth: 50000,
      fifth: 5000,
    };

    for (let rank in lottoResult) {
      if (lottoResult[rank] >= 1) {
        profit += profitOfRank[rank] * lottoResult[rank];
      }
    }

    const profitRate = (profit / cost) * 100;
    this.$profitRateText.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
  }

  setWinnigAndBonusNumbers() {
    this.winnigNumbers = [];
    this.$winningNumberInputs.forEach($input => {
      this.winnigNumbers.push(Number($input.value.trim()));
    });
    if (this.$bonusNumberInput.value !== '') {
      this.bonusNumber = Number(this.$bonusNumberInput.value.trim());
    }
  }

  isEmptyInputs() {
    let res = false;
    this.$winningNumberInputs.forEach($input => {
      if (isEmpty($input)) res = true;
    });
    return res;
  }

  isOverlap() {
    const tmp = [];
    this.$winningNumberInputs.forEach($input => {
      const number = Number($input.value.trim());
      tmp.push(number);
    });
    const binusNumber = Number(this.$bonusNumberInput.value.trim());
    tmp.push(binusNumber);
    const set = new Set(tmp);
    if (set.size !== 7) return true;
    return false;
  }

  onClickRestartButton = () => {
    location.reload();
  };

  getLottoResult() {
    const lottoList = lottoStore.getLottoList();
    const rank = {
      6: 'first',
      5: 'third',
      4: 'fourth',
      3: 'fifth',
    };
    const result = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    lottoList.forEach(lotto => {
      const numberOfMatching = this.countMatchingWinnigNumbers(lotto.numbers);
      if (numberOfMatching < 3) return;
      if (numberOfMatching === 5 && this.isMatchingBonusNumber(lotto.numbers)) {
        result['second']++;
        return;
      }
      result[rank[numberOfMatching]]++;
    });
    return result;
  }

  countMatchingWinnigNumbers(lottoNumbers) {
    let cnt = 0;
    lottoNumbers.forEach(number => {
      if (this.winnigNumbers.includes(number)) cnt++;
    });
    return cnt;
  }

  isMatchingBonusNumber(lottoNumbers) {
    return lottoNumbers.includes(this.bonusNumber);
  }
}

export default LottoResultModal;
