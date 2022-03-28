import {
  INVALID_LOTTO_PRICE,
  LOTTO_PRICE_MAXIMUM,
  LOTTO_PRICE_MINIMUM,
  LOTTO_NUMBER_MINIMUM,
  LOTTO_NUMBER_MAXIMUM,
  INVALID_LOTTO_MINIMUM_PRICE,
  INVALID_LOTTO_MAXIMUM_PRICE,
  INVALID_LOTTO_NUMBER,
  INVALID_MINIMUM_LOTTO_NUMBER,
  INVALID_MAXIMUM_LOTTO_NUMBER,
  INVALID_OVERLAP_LOTTO_NUMBER,
} from '../js/utils/constants.js';
import { $$ } from '../js/utils/dom.js';

const showErrorInput = (element) => {
  element.classList.add('error-input');
};

const resetErrorInput = () => {
  for (let lottoInput of $$('.winning-number')) {
    lottoInput.classList.remove('error-input');
  }
};

const validation = {
  lottoPrice: (money) => {
    if (money % LOTTO_PRICE_MINIMUM !== 0) {
      alert(INVALID_LOTTO_PRICE);
      return true;
    }
    return false;
  },
  lottomMinimumPrice: (money) => {
    if (money < LOTTO_PRICE_MINIMUM) {
      alert(INVALID_LOTTO_MINIMUM_PRICE);
      return true;
    }
    return false;
  },
  lottomMaximumPrice: (money) => {
    if (LOTTO_PRICE_MAXIMUM < money) {
      alert(INVALID_LOTTO_MAXIMUM_PRICE);
      return true;
    }
    return false;
  },
  emptyLottoNumber: () => {
    resetErrorInput();
    for (let lottoInput of $$('.winning-number')) {
      if (lottoInput.value.length === 0) {
        showErrorInput(lottoInput);
        alert(INVALID_LOTTO_NUMBER);
        return true;
      }
    }
    return false;
  },

  lottoNumberUnderMinimum: () => {
    resetErrorInput();
    for (let lottoInput of $$('.winning-number')) {
      if (lottoInput.value < LOTTO_NUMBER_MINIMUM) {
        showErrorInput(lottoInput);
        alert(INVALID_MINIMUM_LOTTO_NUMBER);
        return true;
      }
    }
    return false;
  },

  lottoNumberOverMaximum: () => {
    resetErrorInput();
    for (let lottoInput of $$('.winning-number')) {
      if (LOTTO_NUMBER_MAXIMUM < lottoInput.value) {
        showErrorInput(lottoInput);
        alert(INVALID_MAXIMUM_LOTTO_NUMBER);
        return true;
      }
    }
    return false;
  },

  lottoNumberOverlap: () => {
    let lottoNumber = [];
    resetErrorInput();
    for (let lottoInput of $$('.winning-number')) {
      const lottoNumberValue = lottoInput.value;
      if (lottoNumber.indexOf(lottoNumberValue) > -1) {
        showErrorInput(lottoInput);
        alert(INVALID_OVERLAP_LOTTO_NUMBER);
        return true;
      }
      lottoNumber.push(lottoNumberValue);
    }
    return false;
  },
};

export default validation;
