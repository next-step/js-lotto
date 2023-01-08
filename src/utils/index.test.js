import { TITLE_WITH_VALUE_MAP } from '../constants/modal.js';
import { checkNumbersDuplidate, generateWinningCount, getWinningCount, makeLottoNumbers } from './index.js';

describe('난수 배열을 만드는 유틸리티 함수에 대한 테스트', () => {
  it('천원 단위가 아닌 경우 에러 발생시킴', () => {
    expect(() => {
      makeLottoNumbers(5501 / 1000);
    }).toThrow('난수생성을 위해 1000원 단위로 입력되어야 합니다.');
  });

  it('천원단위의 돈만큼 난수배열을 만들어야함', () => {
    const [randomNumbers, result] = [makeLottoNumbers(5000 / 1000), 5];
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

      expect(checkNumbersDuplidate([...randomNumbers])).toEqual([...randomNumbers]);
    });

    it('중복이 있는 경우 난수로 생긴 새로운 별도의 배열을 넣어주고 반환해주며 동일한 길이를 가진다', () => {
      const randomNumbers = [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [13, 14, 15, 16, 17, 18],
      ];

      expect(checkNumbersDuplidate([...randomNumbers])).not.toEqual([...randomNumbers]);
      expect(checkNumbersDuplidate([...randomNumbers]).length).toEqual([...randomNumbers].length);
    });
  });
});

describe('입력된 당첨 번호 및 보너스번호를 통해 당첨된 케이스 별로 map을 반환해줘야함', () => {
  const lottoNumbers = [
    [1, 2, 3, 4, 5, 6], // 6개
    [1, 2, 3, 4, 5, 11], //보너스 + 5개
    [1, 2, 3, 4, 5, 10], // 5개
    [1, 2, 3, 4, 5, 7], // 5개
    [13, 14, 15, 16, 17, 18], // 0개
    [1, 13, 10, 3, 7, 6], // 3개 & 보너스 x
  ];
  const [winningInput, bonusNumber] = [[1, 2, 3, 4, 5, 6], 11];
  it('입력된 당첨번호와 보너스번호를 통해 각 로또 state와 함께 맞는 개수 및 보너스넘버의 유무가 기재된 배열이 반환되어야함', () => {
    expect(
      generateWinningCount({
        lottoNumbers,
        winningInput,
        bonusNumber,
      })
    ).toEqual([
      {
        lottoNumber: [1, 2, 3, 4, 5, 6],
        winningCount: 6,
        isBonusNumber: false,
      },
      {
        lottoNumber: [1, 2, 3, 4, 5, 11],
        winningCount: 5,
        isBonusNumber: true,
      },
      {
        lottoNumber: [1, 2, 3, 4, 5, 10],
        winningCount: 5,
        isBonusNumber: false,
      },
      {
        lottoNumber: [1, 2, 3, 4, 5, 7],
        winningCount: 5,
        isBonusNumber: false,
      },
      {
        lottoNumber: [13, 14, 15, 16, 17, 18],
        winningCount: 0,
        isBonusNumber: false,
      },
      {
        lottoNumber: [1, 13, 10, 3, 7, 6],
        winningCount: 3,
        isBonusNumber: false,
      },
    ]);
  });

  it('랜덤넘버와 매칭되는 것이 있으면 매칭되는것에 대한 카운트를 반환해줘야함', () => {
    const TOTAL_ADVANTAGE =
      TITLE_WITH_VALUE_MAP.get('6개') +
      TITLE_WITH_VALUE_MAP.get('5개 + 보너스볼') +
      TITLE_WITH_VALUE_MAP.get('5개') * 2 +
      TITLE_WITH_VALUE_MAP.get('3개');
    expect(
      getWinningCount({
        lottoNumbers,
        winningInput,
        bonusNumber,
      })
    ).toEqual({
      countedLottoNumbersMap: new Map([
        ['6개', 1],
        ['5개 + 보너스볼', 1],
        ['5개', 2],
        ['3개', 1],
      ]),
      totalAdvantage: TOTAL_ADVANTAGE,
    });
  });
});
