export const hasNumberValidator = (array) => {
  const validator = array.some((number) => Number.isNaN(number));

  if (validator) {
    throw new Error("숫자를 입력해주세요.");
  }
};
