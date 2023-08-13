import { SINGLE_LOTTO_PRICE } from "../data/constant.js";

export const checkInputValueType = (value) => {
  if (isNaN(value)) {
    throw new Error("금액은 숫자만 입력 가능합니다.");
  }
};

export const isValidAmount = (value) => {
  if (String(value).includes(" ")) {
    throw new Error("입력한 금액은 공백을 포함할 수 없습니다.");
  }

  if (value <= 0) {
    throw new Error("입력한 금액은 0보다 커야합니다.");
  }
};

export const checkInputValueUnit = (value) => {
  if (value % SINGLE_LOTTO_PRICE !== 0) {
    throw new Error(`금액은 ${SINGLE_LOTTO_PRICE}원 단위로 입력 가능합니다.`);
  }
};
