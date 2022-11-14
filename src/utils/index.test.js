import { makeRandomNumbers } from './index.js';

describe('난수 배열을 만드는 유틸리티 함수에 대한 테스트', () => {
  it('천원단위의 돈만큼 난수배열을 만들어야함', () => {
    const [randomNumbers, result] = [makeRandomNumbers(5000), 5];
    expect(randomNumbers.length).toBe(result);
  });
});
