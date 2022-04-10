import {
  INVALID_LOTTO_MAXIMUM_PRICE,
  INVALID_LOTTO_MINIMUM_PRICE,
  INVALID_LOTTO_NUMBER,
  INVALID_LOTTO_PRICE,
  INVALID_MAXIMUM_LOTTO_NUMBER,
  INVALID_MINIMUM_LOTTO_NUMBER,
  INVALID_OVERLAP_LOTTO_NUMBER,
  LOTTO_NUMBER_MAXIMUM,
  LOTTO_NUMBER_MINIMUM,
  LOTTO_PRICE_MAXIMUM,
  LOTTO_PRICE_MINIMUM,
} from '../js/utils/constants.js';

const showErrorInput = (element) => {
  element.classList.add('error-input');
};

const resetInputErrorStyle = (selector) => {
  selector.forEach((input) => input.classList.remove('error-input'));
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
    for (let lottoInput of $$('.winning-number')) {
    resetInputErrorStyle(winningNumberElement);
      if (lottoInput.value.length === 0) {
        showErrorInput(lottoInput);
        alert(INVALID_LOTTO_NUMBER);
        return true;
      }
    }
    return false;
  },

  lottoNumberUnderMinimum: () => {
    for (let lottoInput of $$('.winning-number')) {
    resetInputErrorStyle(winningNumberElement);
      if (lottoInput.value < LOTTO_NUMBER_MINIMUM) {
        showErrorInput(lottoInput);
        alert(INVALID_MINIMUM_LOTTO_NUMBER);
        return true;
      }
    }
    return false;
  },

  lottoNumberOverMaximum: () => {
    for (let lottoInput of $$('.winning-number')) {
    resetInputErrorStyle(winningNumberElement);
      if (LOTTO_NUMBER_MAXIMUM < lottoInput.value) {
        showErrorInput(lottoInput);
        alert(INVALID_MAXIMUM_LOTTO_NUMBER);
        return true;
      }
    }
    return false;
  },

  lottoNumberOverlap: () => {
    for (let lottoInput of $$('.winning-number')) {
    const lottoNumber = [];
    resetInputErrorStyle(winningNumberElement);
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
