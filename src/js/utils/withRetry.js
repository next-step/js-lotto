export const withRetry = async (action) => {
  let flag = true;
  let result;
  while (flag) {
    try {
      result = await action();
      flag = false;
    } catch (error) {
      flag = true;
      // FIXME: 에러를 처리할 수 있는 별도 객체에 전달해주자
      console.log(error.message);
    }
  }

  return result;
};
