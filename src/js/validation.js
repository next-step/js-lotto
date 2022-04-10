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

const hasEmptyInput = (selector) =>
  Array.from(selector).find(($input) => $input.value === '');

const hasUnderMinimumNumber = (selector) =>
  Array.from(selector).find(($input) => $input.value < LOTTO_NUMBER_MINIMUM);

const hasUnderMaximumNumber = (selector) =>
  Array.from(selector).find(($input) => LOTTO_NUMBER_MAXIMUM < $input.value);

const validate = (predicate, handleError) => {
  if (!predicate) {
    return false;
  }
  handleError();
  return true;
};

const validation = {
  lottoPrice: (money) =>
    validate(predicate.lottoPrice(money), handleError.lottoPrice),
  lottomMinimumPrice: (money) =>
    validate(
      predicate.lottomMinimumPrice(money),
      handleError.lottomMinimumPrice
    ),
  lottomMaximumPrice: (money) =>
    validate(
      predicate.lottomMaximumPrice(money),
      handleError.lottomMaximumPrice
    ),
  emptyLottoNumber: (winningNumberElement) => {
    const errorInput = predicate.emptyLottoNumber(winningNumberElement);

    if (errorInput) showErrorInput(errorInput);
    return validate(
      predicate.emptyLottoNumber(winningNumberElement),
      handleError.emptyLottoNumber
    );
  },
  lottoNumberUnderMinimum: (winningNumberElement) => {
    const errorInput = predicate.lottoNumberUnderMinimum(winningNumberElement);
    if (errorInput) showErrorInput(errorInput);

    return validate(
      predicate.lottoNumberUnderMinimum(winningNumberElement),
      handleError.lottoNumberUnderMinimum
    );
  },
  lottoNumberOverMaximum: (winningNumberElement) => {
    const errorInput = predicate.lottoNumberOverMaximum(winningNumberElement);
    if (errorInput)
      showErrorInput(predicate.lottoNumberOverMaximum(winningNumberElement));

    return validate(
      predicate.lottoNumberOverMaximum(winningNumberElement),
      handleError.lottoNumberOverMaximum
    );
  },
  lottoNumberOverlap: (winningNumberElement) => {
    return validate(
      predicate.lottoNumberOverlap(winningNumberElement),
      handleError.lottoNumberOverlap
    );
  },
};

const predicate = {
  lottoPrice: (money) => money % LOTTO_PRICE_MINIMUM !== 0,
  lottomMinimumPrice: (money) => money < LOTTO_PRICE_MINIMUM,
  lottomMaximumPrice: (money) => LOTTO_PRICE_MAXIMUM < money,
  emptyLottoNumber: (winningNumberElement) =>
    hasEmptyInput(winningNumberElement),
  lottoNumberUnderMinimum: (winningNumberElement) =>
    hasUnderMinimumNumber(winningNumberElement),
  lottoNumberOverMaximum: (winningNumberElement) =>
    hasUnderMaximumNumber(winningNumberElement),
  lottoNumberOverlap: (winningNumberElement) => {
    const lottoNumber = [];
    for (let lottoInput of winningNumberElement) {
      const lottoNumberValue = lottoInput.value;
      const isDuplicated = lottoNumber.indexOf(lottoNumberValue) > -1;
      if (isDuplicated) {
        showErrorInput(lottoInput);
        return true;
      }
      lottoNumber.push(lottoNumberValue);
    }

    return false;
  },
};

const handleError = {
  lottoPrice: () => alert(INVALID_LOTTO_PRICE),
  lottomMinimumPrice: () => alert(INVALID_LOTTO_MINIMUM_PRICE),
  lottomMaximumPrice: () => alert(INVALID_LOTTO_MAXIMUM_PRICE),
  emptyLottoNumber: () => alert(INVALID_LOTTO_NUMBER),
  lottoNumberUnderMinimum: () => alert(INVALID_MINIMUM_LOTTO_NUMBER),
  lottoNumberOverMaximum: () => alert(INVALID_MAXIMUM_LOTTO_NUMBER),
  lottoNumberOverlap: () => alert(INVALID_OVERLAP_LOTTO_NUMBER),
};

export default validation;
