'use strict';

import { $, $$ } from '../utils/dom.js';
import { template } from '../utils/templates.js';
import { lottoStore } from './store.js';

class LottoPurchasedList {
  constructor() {
    this.$lottoPurchasedSection = $('#lotto-purchased-section');
    this.$lottoPurcasedList = $('#lotto-purchased-list');
    this.$toggleButton = $('.lotto-numbers-toggle-button');
    this.$toggleButton.addEventListener('click', this.onClickToggleButton);
  }

  init(numberOfLotto) {
    this.$lottoPurchasedSection.style.display = 'block';
    this.createLottoList(numberOfLotto);
    this.renderLottoList();
  }

  createLottoList(numberOfLotto) {
    for (let i = 0; i < numberOfLotto; i++) {
      const lottoNumbers = [];
      for (let j = 0; j < 6; j++) {
        const number = Math.floor(Math.random() * 45);
        lottoNumbers.push(number);
      }
      lottoStore.addLotto(lottoNumbers);
    }
  }

  renderLottoList() {
    const lottoList = lottoStore.getLottoList();
    lottoList.forEach(lotto => {
      const numbers = lotto.numbers.join(', ');
      this.$lottoPurcasedList.innerHTML += template.lotto(numbers);
    });
  }

  onClickToggleButton = () => {
    this.toggleLottoList();
  };

  toggleLottoList() {
    const $lottos = $$('.lotto-wrapper', this.$lottoPurcasedList);
    const option = this.$lottoPurcasedList.matches('.flex-col')
      ? 'turnItOff'
      : 'turnItOn';
    const toggle = {
      turnItOn: () => {
        this.$lottoPurcasedList.classList.add('flex-col');
        $lottos.forEach($lotto => {
          const $lottoDetail = $('.lotto-detail', $lotto);
          $lottoDetail.style.display = 'inline';
        });
      },
      turnItOff: () => {
        this.$lottoPurcasedList.classList.remove('flex-col');
        $lottos.forEach($lotto => {
          const $lottoDetail = $('.lotto-detail', $lotto);
          $lottoDetail.style.display = 'none';
        });
      },
    };
    toggle[option]();
  }
}

export default LottoPurchasedList;
