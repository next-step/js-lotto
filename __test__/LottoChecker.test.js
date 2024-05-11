import Lotto from "../src/domain/Lotto";
import LottoChecker from "../src/domain/LottoChecker";

describe("Lotto Checker", () => {
  let lottoChecker;

  beforeEach(() => {
    const prizeInfo = [
      {
        correctWinningNumberLength: 6,
        correctBonusNumberLength: 0,
        prize: 2000000000,
      },
      {
        correctWinningNumberLength: 5,
        correctBonusNumberLength: 1,
        prize: 30000000,
      },
      {
        correctWinningNumberLength: 5,
        correctBonusNumberLength: 0,
        prize: 1500000,
      },
      {
        correctWinningNumberLength: 4,
        correctBonusNumberLength: 0,
        prize: 50000,
      },
      {
        correctWinningNumberLength: 3,
        correctBonusNumberLength: 0,
        prize: 5000,
      },
    ];

    lottoChecker = new LottoChecker(prizeInfo);
  });

  afterAll(() => {
    lottoChecker = null;
  });

  describe("유효한 로또 당첨 번호를 입력받는다.", () => {
    describe("로또의 번호는 6개, 보너스 번호는 한 개이다.", () => {
      test.each([
        [5, [1, 2, 3, 4, 5]],
        [7, [1, 2, 3, 4, 5, 6, 7]],
      ])("당첨 번호가 %s개이면 에러를 던진다.", (_, numbers) => {
        // when
        const setLottoNumberInfo = () =>
          lottoChecker.setLottoNumberInfo(numbers, [1]);

        // then
        expect(() => setLottoNumberInfo()).toThrow(Error);
      });

      test.each([
        [2, [1, 2]],
        [0, []],
      ])("보너스 번호가 %s개이면 에러를 던진다.", (_, numbers) => {
        // when
        const setLottoNumberInfo = () =>
          lottoChecker.setLottoNumberInfo([1, 2, 3, 4, 5, 6], numbers);

        // then
        expect(() => setLottoNumberInfo()).toThrow(Error);
      });
    });

    describe("로또의 번호는 1부터 45까지의 자연수이다.", () => {
      test.each([-1, 0, 46, 1.3])(
        "당첨번호에 %s가 있는 경우 에러를 던진다.",
        (number) => {
          // when
          const setLottoNumberInfo = () =>
            lottoChecker.setLottoNumberInfo([1, 2, 3, 4, number, 6], [1]);

          // then
          expect(() => setLottoNumberInfo()).toThrow(Error);
        }
      );

      test.each([-1, 0, 46, 1.3])(
        "보너스 번호에 %s가 있는 경우 에러를 던진다.",
        (number) => {
          // when
          const setLottoNumberInfo = () =>
            lottoChecker.setLottoNumberInfo([1, 2, 3, 4, 5, 6], number);

          // then
          expect(() => setLottoNumberInfo()).toThrow(Error);
        }
      );
    });

    describe("로또의 번호는 중복되지 않는다.", () => {
      test("당첨 번호에 중복이 있는 경우 에러를 던진다.", () => {
        // when
        const setLottoNumberInfo = () =>
          lottoChecker.setLottoNumberInfo([1, 2, 3, 4, 5, 4], 7);

        // then
        expect(() => setLottoNumberInfo()).toThrow(Error);
      });

      test("보너스 번호와 당첨 번호에가 중복이 있는 경우 에러를 던진다.", () => {
        // when
        const setLottoNumberInfo = () =>
          lottoChecker.setLottoNumberInfo([1, 2, 3, 4, 5, 6], 5);

        // then
        expect(() => setLottoNumberInfo()).toThrow(Error);
      });
    });

    test("로또 당첨 결과 확인 전에 당첨 번호와 보너스 번호를 설정하지 않으면 에러를 던진다.", () => {
      // given
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

      // when
      const checkLotto = () => lottoChecker.checkLotto(lotto);

      // then
      expect(() => checkLotto()).toThrow(Error);
    });
  });

  describe("로또의 당첨 결과를 확인할 수 있다.", () => {
    beforeEach(() => {
      const lottoNumberInfo = {
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumbers: [7],
      };

      lottoChecker.lottoNumberInfo = lottoNumberInfo;
    });

    test("로또 번호가 6개가 일치하면 2000000000을 상금으로 받는다.", () => {
      // when
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const { correctWinningNumbers, correctBonusNumbers, prizeInfo } =
        lottoChecker.checkLotto(lotto);

      // then
      expect(correctWinningNumbers).toHaveLength(6);
      expect(correctBonusNumbers).toHaveLength(0);
      expect(prizeInfo.correctWinningNumberLength).toBe(6);
      expect(prizeInfo.correctBonusNumberLength).toBe(0);
      expect(prizeInfo.prize).toBe(2000000000);
    });

    test("로또 번호가 5개 + 보너스 번호 1개가 일치하면 30,000,000원 상금을 받는다.", () => {
      // when
      const lotto = new Lotto([1, 2, 3, 4, 5, 7]);
      const { correctWinningNumbers, correctBonusNumbers, prizeInfo } =
        lottoChecker.checkLotto(lotto);

      // then
      expect(correctWinningNumbers).toHaveLength(5);
      expect(correctBonusNumbers).toHaveLength(1);
      expect(prizeInfo.correctWinningNumberLength).toBe(5);
      expect(prizeInfo.correctBonusNumberLength).toBe(1);
      expect(prizeInfo.prize).toBe(30000000);
    });

    test("로또 번호가 2개 일치, 보너스 번호 1개 일치하는 경우에는 상금이 없다.", () => {
      // when
      const lotto = new Lotto([45, 7, 43, 42, 2, 1]);
      const { correctWinningNumbers, correctBonusNumbers, prizeInfo } =
        lottoChecker.checkLotto(lotto);

      // then
      expect(correctWinningNumbers).toHaveLength(2);
      expect(correctBonusNumbers).toHaveLength(1);
      expect(prizeInfo).toBeNull();
    });

    test("로또 번호가 모두 일치 하지 않는 경우에는 상금이 없다.", () => {
      // when
      const lotto = new Lotto([45, 44, 43, 42, 41, 30]);
      const { correctWinningNumbers, correctBonusNumbers, prizeInfo } =
        lottoChecker.checkLotto(lotto);

      // then
      expect(correctWinningNumbers).toHaveLength(0);
      expect(correctBonusNumbers).toHaveLength(0);
      expect(prizeInfo).toBeNull();
    });
  });
});
