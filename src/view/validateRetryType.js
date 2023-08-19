export const validateRetryType = text => {
  if (text !== 'y' && text !== 'n') {
    throw new Error('y 또는 n을 입력해주세요.');
  }
};
