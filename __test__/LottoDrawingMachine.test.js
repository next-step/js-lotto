import { LOTTO } from "../src/constant";
import LottoDrawingMachine from "../src/domain/LottoDrawingMachine";

describe("LottoDrawingMachine", () => {
  let lottoDrawingMachine;

  beforeEach(() => {
    lottoDrawingMachine = new LottoDrawingMachine({
      winningNumbersCount: LOTTO.NUMBER_COUNT,
      bonusNumberCount: LOTTO.BONUS_NUMBER_COUNT,
      minNumber: LOTTO.MIN_NUMBER,
      maxNumber: LOTTO.MAX_NUMBER,
    });
  });

  afterEach(() => {
    lottoDrawingMachine = null;
  });

  test(`추첨된 당첨번호는 ${LOTTO.NUMBER_COUNT}개, 보너스 번호는 ${LOTTO.BONUS_NUMBER_COUNT}개이다.`, () => {
    //when
    lottoDrawingMachine.drawNumbers();

    const winningNumbers = lottoDrawingMachine.winningNumbers;
    const bonusNumbers = lottoDrawingMachine.bonusNumbers;

    //then
    expect(winningNumbers).toHaveLength(LOTTO.NUMBER_COUNT);
    expect(bonusNumbers).toHaveLength(LOTTO.BONUS_NUMBER_COUNT);
  });

  test("보너스 번호 포함 당첨번호는 중복되지 않는다.", () => {
    //when
    lottoDrawingMachine.drawNumbers();

    const winningNumbers = lottoDrawingMachine.winningNumbers;
    const bonusNumbers = lottoDrawingMachine.bonusNumbers;

    const allNumbers = [...winningNumbers, ...bonusNumbers];
    const uniqueNumbers = new Set(allNumbers);

    //then
    expect(allNumbers).toHaveLength(uniqueNumbers.size);
  });

  describe(`추첨번호는 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER}까지의 자연수이다.`, () => {
    test.each([-1, 0, LOTTO.MAX_NUMBER + 1, LOTTO.MIN_NUMBER - 1, 1.3])(
      "추첨번호에는 %s.가 속할 수 없다.",
      (number) => {
        const { winningNumbers, bonusNumbers } = lottoDrawingMachine;

        winningNumbers.forEach((winningNum) => {
          expect(winningNum).not.toBe(number);
        });

        bonusNumbers.forEach((bonusNum) => {
          expect(bonusNum).not.toBe(number);
        });
      }
    );
  });
});
