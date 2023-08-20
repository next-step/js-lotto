import {shuffle} from '../shuffle';

describe('shuffle 함수 test', () => {
  test('배열을 섞더라도 구성요소의 합은 같다.', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const shuffledArr = shuffle(arr);

    const sum = nums => nums.reduce((total, num) => total + num, 0);

    expect(sum(arr)).toBe(sum(shuffledArr));
  });
});
