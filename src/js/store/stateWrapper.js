// proxy vs reflect
// target 연산자 무시 vs target 연산자 이어서 처리
// 프로토타입에 대한 사이드 이펙트 처리를 위해 사용

const stateWrapper = (targetState, renderer) => {
  const handler = {
    get(...props) {
      return Reflect.get(...props);
    },
    set(...props) {
      const ret = Reflect.set(...props);
      renderer();
      return ret;
    },
  };

  return new Proxy(targetState, handler);
};

export default stateWrapper;
