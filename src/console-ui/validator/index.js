const positiveIntegerValidator = (inputString) => {
  try {
    const validatedValue = parseInt(inputString);
    if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
      throw new Error("invalid value: 올바르지 않은 값 입니다.");
    }
    return validatedValue;
  } catch (error) {
    throw error;
  }
};

const lottoNumberValidator = (inputString) => {
  try {
    const validatedValue = inputString
      .split(",")
      .map((number) => parseInt(number));
    if (validatedValue.some((number) => isNaN(number))) {
      throw new Error("invalid value: 올바르지 않은 값 입니다.");
    }
    return validatedValue;
  } catch (error) {
    throw error;
  }
};

const purchaseAmountValidator = (inputString) => {
  try {
    const purchaseAmount = parseInt(inputString);
    if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
      throw new Error("유효하지 않은 구입 금액입니다.");
    }
    return purchaseAmount;
  } catch (error) {
    throw new Error("유효하지 않은 구입 금액입니다.");
  }
};

export {
  positiveIntegerValidator,
  lottoNumberValidator,
  purchaseAmountValidator,
};
