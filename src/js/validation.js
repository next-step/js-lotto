// 3
// 유효성 검증
// 에러 핸들링 => 유연하게
export const validateInput = (validation, errorHandler) => {
  if (!validation) {
    errorHandler();
    return false;
  }
  return true;
};
