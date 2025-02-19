export const checkInputTypeIsNumber = (input) => {
  return !Number.isNaN(Number(input));
};

export const checkCanBuyLotto = (input) => {
  return Number(input) >= 1000;
};

export const checkAllInputsTypeisNumber = (input) => {
  const inputArr = input.split(",");

  return inputArr.every((item) => checkInputTypeIsNumber(item));
};
export const checkInputsLengthValid = (input) => {
  const inputArr = input.split(",");

  return inputArr.length === 6;
};
export const checkInputNumbersValid = (input) => {
  return input.split(",").every((number) => number > 0 && number <= 45);
};

export const checkBonusValid = (input) => {
  return input > 0 && input <= 45;
};
export const checkUserInputString = (input) => {
  return typeof input === "string";
};
export const checkAllInputNotDuplicate = (input) => {
  const inputArr = input.split(",");
  return !inputArr.some((item, index) => inputArr.indexOf(item) !== index);
};
export const checkUserAnswerValid = (input) => {
  if (checkUserInputString(input)) {
    if (input.toLowerCase() === "y" || input.toLowerCase() === "n") return true;

    return false;
  } else {
    throw new Error("인풋으로 입력된 값의 타입이 string이 아닙니다.");
  }
};

export const checkUserInputValidateForBuyLotto = (input) => {
  if (!checkUserInputString(input)) {
    throw new Error("인풋으로 입력된 값의 타입이 string이 아닙니다.");
  }

  if (!checkInputTypeIsNumber(input)) {
    throw new Error("숫자만 입력해주세요.");
  }
  if (!checkCanBuyLotto(input)) {
    throw new Error("1000 이상의 금액을 넣어주세요.");
  }
};

export const checkUserInputValidateForWinningNumber = (input) => {
  if (!checkUserInputString(input)) {
    throw new Error("인풋으로 입력된 값의 타입이 string이 아닙니다.");
  }
  if (!checkInputsLengthValid(input)) {
    throw new Error("숫자를 쉼표(,)로 구분해서 6개 입력해주세요");
  }
  if (!checkAllInputNotDuplicate(input)) {
    throw new Error("중복된 값은 사용할 수 없습니다.");
  }
  if (!checkInputNumbersValid(input)) {
    throw new Error("입력 가능한 수의 범위는 1부터 45까지 입니다.");
  }
  if (!checkAllInputsTypeisNumber(input)) {
    throw new Error("숫자만 입력해주세요.");
  }
};

export const checkUserInputValidateForBonusNumber = (input) => {
  if (!checkUserInputString(input)) {
    throw new Error("인풋으로 입력된 값의 타입이 string이 아닙니다.");
  }
  if (!checkInputTypeIsNumber(input)) {
    throw new Error("숫자만 입력해주세요.");
  }
  if (!checkBonusValid(input)) {
    throw new Error("입력 가능한 수의 범위는 1부터 45까지 입니다.");
  }
};

export const checkUserInputValidateForRetry = (input) => {
  if (!checkUserAnswerValid(input)) {
    throw new Error("y와 n 중 하나의 값을 입력하세요.");
  }
};
