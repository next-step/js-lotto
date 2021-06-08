'use strict';

import { $, $$ } from '../utils/dom.js';
import { template } from '../utils/templates.js';
import { lottoStore } from './store.js';
import {
  START_NUMBER,
  LAST_NUMBER,
  LOTTO_NUMBER_UNIT,
} from '../utils/constants.js';

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
    [...Array(numberOfLotto)].forEach(() => {
      const lottoNumberList = this.getRandomNumberList(LOTTO_NUMBER_UNIT);
      lottoStore.addLotto(lottoNumberList);
    });
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getRandomNumberList(numberOfRandom) {
    let randomNumbers = [];
    while (randomNumbers.length < numberOfRandom) {
      const radomNumber = this.getRandomNumber(START_NUMBER, LAST_NUMBER);
      if (!randomNumbers.includes(radomNumber)) randomNumbers.push(radomNumber);
    }
    return randomNumbers;
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
