import lotto from "../src/lotto/lotto.js";

describe("로또 객체 비즈니스 로직 테스트", () => {
  it("로또 구입 금액에 해당하는 만큼 로또를 발행한다.", () => {
    //given
    const purchaseAmount = 10000;
    const lottoPrice = lotto.LOTTO_PRICE;
    //when
    const lottos = lotto.createLotto(purchaseAmount);
    //then
    expect(lottos.length).toBe(purchaseAmount / lottoPrice);
  });

  it("로또 번호는 1부터 45까지의 번호 중 중복 없이 6개를 생성한다.", () => {
    //given
    const myLotto = new lotto.Lotto();
    //when
    const lottoUniqueNumbersCount = new Set(myLotto.getNumbers()).size;
    const isValidRangeLottoNumbers = myLotto
      .getNumbers()
      .every((number) => number >= 1 && number <= 45);
    //then
    expect(lottoUniqueNumbersCount).toBe(6);
    expect(isValidRangeLottoNumbers).toBe(true);
  });

  it("당첨 번호와 보너스 번호를 저장한다.", () => {
    //given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    //when
    const myLotto = new lotto.Lotto(winningNumbers);
    const winningLotto = new lotto.WinningLotto(myLotto, bonusNumber);
    //then
    expect(winningLotto.getNumbers()).toBe(winningNumbers);
    expect(winningLotto.getBonusNumber()).toBe(bonusNumber);
  });

  it("사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역을 게산한다.", () => {
    //given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const myLotto = new lotto.Lotto(winningNumbers);

    const winningLotto = new lotto.WinningLotto(myLotto, bonusNumber);
    //when
    const prize = lotto.LottoWinningRule.getPrize(winningLotto, myLotto);
    //then
    expect(prize).toBe(lotto.LottoWinningRule.FIRST_PRIZE);
  });

  it("사용자가 구매한 모든 로또 번호와 당첨 번호를 비교하여 당첨 내역을 게산한다.", () => {
    //given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const myLottos = [
      new lotto.Lotto([1, 2, 3, 4, 5, 6]), //1등
      new lotto.Lotto([1, 2, 3, 4, 5, 7]), //2등
      new lotto.Lotto([1, 2, 3, 4, 5, 8]), //3등
    ];
    const winningLotto = new lotto.WinningLotto(
      new lotto.Lotto(winningNumbers),
      bonusNumber
    );

    //when
    const prizes = lotto.LottoWinningRule.getWinningResult(
      winningLotto,
      myLottos
    );
    //then
    expect(prizes).toEqual([
      lotto.LottoWinningRule.FIRST_PRIZE,
      lotto.LottoWinningRule.SECOND_PRIZE,
      lotto.LottoWinningRule.THIRD_PRIZE,
    ]);
  });

  it("사용자의 당첨내역의 수익률을 계산한다.", () => {
    //given
    const purchaseAmount = 10000;
    const winningResult = [
      lotto.LottoWinningRule.FIRST_PRIZE,
      lotto.LottoWinningRule.SECOND_PRIZE,
      lotto.LottoWinningRule.THIRD_PRIZE,
    ];
    //when
    const winningRate = lotto.LottoWinningRule.getWinningRate(
      winningResult,
      purchaseAmount
    );
    //then
    const expectedWinningRate =
      (winningResult.reduce((acc, prize) => acc + prize.prize, 0) /
        purchaseAmount) *
      100;
    expect(winningRate).toBe(expectedWinningRate);
  });

  it("당첨 내역과 수익률을 출력할 수 있게 한다.", () => {
    //given
    const purchaseAmount = 10000;
    const winningResult = [
      lotto.LottoWinningRule.FIRST_PRIZE,
      lotto.LottoWinningRule.FIRST_PRIZE,
      lotto.LottoWinningRule.SECOND_PRIZE,
      lotto.LottoWinningRule.THIRD_PRIZE,
    ];
    const expectedWinningRate = lotto.LottoWinningRule.getWinningRate(
      winningResult,
      purchaseAmount
    );
    //when
    const winningReport = lotto.LottoWinningRule.getWinningReport(
      winningResult,
      purchaseAmount
    );
    //then
    const expectedWinningReport = new Map();
    expectedWinningReport.set(lotto.LottoWinningRule.FIRST_PRIZE, 2);
    expectedWinningReport.set(lotto.LottoWinningRule.SECOND_PRIZE, 1);
    expectedWinningReport.set(lotto.LottoWinningRule.THIRD_PRIZE, 1);

    expect(winningReport).toEqual({
      matched: expectedWinningReport,
      winningRate: expectedWinningRate,
    });
  });
});
