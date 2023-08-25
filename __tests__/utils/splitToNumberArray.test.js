import { splitToNumberArray } from '../../src/js/utils/index.js';

describe('입력값 숫자 배열로 쪼개기 테스트', () => {
  it.each([
    {
      input: '1, 2, 3, 4',
      output: [1, 2, 3, 4],
    },
    {
      input: '1,   2, 3  , 4   ',
      output: [1, 2, 3, 4],
    },
    {
      input: '1',
      output: [1],
    },
    {
      input: '1!3!5',
      output: [1, 3, 5],
      separator: '!',
    },
  ])('$input을 입력할시 $output로 변환된다.', ({ input, output, separator }) => {
    const result = separator ? splitToNumberArray(input, separator) : splitToNumberArray(input);
    expect(result).toEqual(output);
  });
});
