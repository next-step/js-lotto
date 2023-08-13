export const VALIDATE_ONLY_NUMBER_ERROR = {
  NOT_NUMBER: '숫자만 입력해 주세요.',
};

export const validateOnlyNumber = text => {
  const isOnlyNumber = /^\d+$/.test(text);

  if (!isOnlyNumber) {
    throw new Error(VALIDATE_ONLY_NUMBER_ERROR.NOT_NUMBER);
  }
};
