export const hasNumberValidator = (array) => {
  if (array.some((number) => Number.isNaN(number))) {
    throw new Error("숫자를 입력해주세요.");
  }
};
