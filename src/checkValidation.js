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
export const checkBonusValid = (input) => {
  return input > 0 && input < 45;
};
export const checkUserInputString = (input) => {
  return typeof input === "string";
};

export const checkUserAnswerValid = (input) => {
  if (checkUserInputString(input)) {
    if (input.toLowerCase() === "y" || input.toLowerCase() === "n") return true;

    return false;
  }
};

export const checkUserAnswer = (input) => {
  return input === "y" ? true : false;
};
