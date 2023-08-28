import {
  LOTTO_LENGTH,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  SINGLE_LOTTO_PRICE,
} from "../data/constant.js";

export const checkInputPriceType = (price) => {
  if (!price || isNaN(price) || price.includes(" ")) {
    throw new Error("금액은 숫자만 입력 가능하며 빈 값은 허용되지 않습니다.");
  }
};

export const isValidAmount = (price) => {
  if (price <= 0) {
    throw new Error("입력한 금액은 0보다 커야합니다.");
  }
};

export const checkInputPriceUnit = (price) => {
  if (price.length < 4) {
    throw new Error(`금액은 ${SINGLE_LOTTO_PRICE}원 단위로 입력 가능합니다.`);
  }

  if (price % SINGLE_LOTTO_PRICE !== 0) {
    throw new Error(`금액은 ${SINGLE_LOTTO_PRICE}원 단위로 입력 가능합니다.`);
  }
};

export const isValidWinningNumberLength = (winningNumbers) => {
  const inputValue = winningNumbers.split(",");

  if (inputValue.length !== LOTTO_LENGTH) {
    throw new Error("입력하신 당첨 번호의 개수를 확인해주세요.");
  }
};

export const isValidWinningNumberRange = (winningNumbers) => {
  const inputValue = winningNumbers.split(",");

  inputValue.forEach((value) => {
    if (value < MIN_LOTTO_NUMBER || value > MAX_LOTTO_NUMBER) {
      throw new Error(
        `로또 번호는 ${MIN_LOTTO_NUMBER}부터 ${MAX_LOTTO_NUMBER}까지의 숫자만 입력 가능합니다.`
      );
    }
  });
};

export const isWinningNumbersDuplicate = (winningNumbers) => {
  const inputValue = winningNumbers.split(",");

  if (new Set(inputValue).size !== inputValue.length) {
    throw new Error("당첨 번호 내에서 중복된 값을 사용할 수 없습니다.");
  }
};

export const isWinningAndBonusNumberDuplicate = (
  winningNumbers,
  bonusNumber
) => {
  if (winningNumbers.includes(bonusNumber)) {
    throw new Error("당첨 번호와 보너스 번호는 중복될 수 없습니다.");
  }
};
