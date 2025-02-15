describe('isValidJackpotInput 관련 함수', () => {
  describe('당첨 숫자들의 총 개수를 판별할 때', () => {
    test('6개이면 유효성 통과로 true를 반환한다.');
    test('5개 이하이면 통과를 못하게 되어 false를 반환한다.', () => {});
    test('6개 초과이면 통과를 못하게 되어 false를 반환한다.', () => {});
  });
});
