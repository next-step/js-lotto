// 배열의 값을 갖는 컨테이너 컴포넌트를 하나의 컴포넌트로 합치는 역할을합니다.
export const concatContainer = (array, component) => {
  return array.map((item) => component(item)).join('');
};
