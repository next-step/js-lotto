import Console from '@step1/utils/console';
import { describe, expect, test, jest } from '@jest/globals';

const INPUT_TEST = '입력 테스트';
const INPUT_MESSAGE = '입력 메시지 : ';

jest.mock('node:readline/promises', () => ({
  createInterface: () => ({
    question: () => Promise.resolve(INPUT_TEST),
    close: () => {},
  }),
}));

describe('Console 모듈 테스트', () => {
  test('readLine 메서드를 통해 입력 한 값을 받을 수 있다.', async () => {
    // given - when
    const inputValue = await Console.readLine(INPUT_MESSAGE);
    // then
    expect(inputValue).toMatch(INPUT_TEST);
  });

  test('print 메서드를 통해 값을 출력할 수 있다.', () => {
    // given
    const logSpy = jest.spyOn(console, 'log');
    // when
    Console.print(INPUT_TEST);
    // then
    expect(logSpy).toHaveBeenCalledWith(INPUT_TEST);
  });
});
