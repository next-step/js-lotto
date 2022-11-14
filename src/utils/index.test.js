import { checkRandom, makeRandomNumbers } from './index.js';

describe('난수 배열을 만드는 유틸리티 함수에 대한 테스트', () => {
  it('천원단위의 돈만큼 난수배열을 만들어야함', () => {
    const [randomNumbers, result] = [makeRandomNumbers(5000), 5];
    expect(randomNumbers.length).toBe(result);
  });

  describe('checkRandom', () => {
    it('인자로 들어간 난수 배열에 각 요소의 중복이 없는 경우 그대로 반환해주면 된다.', () => {
      const randomNumbers = [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24],
      ];

      expect(checkRandom([...randomNumbers])).toEqual([...randomNumbers]);
    });

    it('중복이 있는 경우 난수로 생긴 새로운 별도의 배열을 넣어주고 반환해주며 동일한 길이를 가진다', () => {
      const randomNumbers = [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [13, 14, 15, 16, 17, 18],
      ];

      expect(checkRandom([...randomNumbers])).not.toEqual([...randomNumbers]);
    });
  });
});
