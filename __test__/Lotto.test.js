import { LOTTO_DIGITS, Lotto } from "../src/js/domain/Lotto";
import { LottoRank } from "../src/js/domain/enum/LottoRank";

describe("로또 테스트", () => {
  test(`로또는 ${LOTTO_DIGITS}개의 번호를 가진다.`, () => {
    //given
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(numbers);

    //when
    const numberCount = lotto.numbers.length;

    //then
    expect(numberCount).toBe(6);
  });

  test(`로또 번호가 ${LOTTO_DIGITS}개가 아니라면 에러를 반환한다.`, () => {
    //given
    const numbers = Array(LOTTO_DIGITS - 1)
      .fill()
      .map((_, i) => i + 1);

    //when
    const whenNotValidLength = () => new Lotto(numbers);

    //then
    expect(whenNotValidLength).toThrow();
  });

  test("중복된 번호가 있다면 에러를 반환한다.", () => {
    //given
    const duplicated = 1;
    const numbers = [duplicated, duplicated, 2, 3, 4, 5];

    //when
    const whenExistsDuplicated = () => new Lotto(numbers);

    //then
    expect(whenExistsDuplicated).toThrow();
  });

  test("번호가 1~45 사이의 숫자가 아니라면 에러를 반환한다.", () => {
    //given
    const outOfRange = 46;
    const numbers = [1, 2, 3, 4, 5, outOfRange];

    //when
    const whenExistsOutOfRange = () => new Lotto(numbers);

    //then
    expect(whenExistsOutOfRange).toThrow();
  });

  test("번호와 당첨번호가 6개 모두 일치하면 1등을 반환한다.", () => {
    //given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const firstRankNumbers = [1, 2, 3, 4, 5, 6];
    const firstRankLotto = new Lotto(firstRankNumbers);

    //when
    const firstRank = firstRankLotto.compare(winningNumbers, bonusNumber);

    //then
    expect(firstRank).toBe(LottoRank.FIRST);
  });

  test("번호와 당첨번호가 5개가 맞고 보너스 번호가 일치하면 2등을 반환한다.", () => {
    //given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const secondRankNumbers = [1, 2, 3, 4, 5, bonusNumber];
    const secondRankLotto = new Lotto(secondRankNumbers);

    //when
    const secondRank = secondRankLotto.compare(winningNumbers, bonusNumber);

    //then
    expect(secondRank).toBe(LottoRank.SECOND);
  });

  test("번호와 당첨번호가 5개가 일치하고 보너스 번호가 일치하지 않으면 3등을 반환한다.", () => {
    //given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const thirdRankNumbers = [1, 2, 3, 4, 5, 45];
    const thirdRankLotto = new Lotto(thirdRankNumbers);

    //when
    const thirdRank = thirdRankLotto.compare(winningNumbers, bonusNumber);

    //then
    expect(thirdRank).toBe(LottoRank.THIRD);
  });

  test("번호와 당첨번호가 4개가 일치하면 4등을 반환한다.", () => {
    //given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const fourthRankNumbers = [1, 2, 3, 4, 44, 45];
    const fourthRankLotto = new Lotto(fourthRankNumbers);

    //when
    const fourthRank = fourthRankLotto.compare(winningNumbers, bonusNumber);

    //then
    expect(fourthRank).toBe(LottoRank.FOURTH);
  });

  test("번호와 당첨번호가 3개가 일치하면 5등을 반환한다.", () => {
    //given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const fifthRankNumbers = [1, 2, 3, 43, 44, 45];
    const fifthRankLotto = new Lotto(fifthRankNumbers);

    //when
    const fifthRank = fifthRankLotto.compare(winningNumbers, bonusNumber);

    //then
    expect(fifthRank).toBe(LottoRank.FIFTH);
  });

  test("번호와 당첨번호가 2개 이하로 일치하면 nothing을 반환한다.", () => {
    //given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const nothingNumbers = [1, 2, 42, 43, 44, 45];
    const nothingLotto = new Lotto(nothingNumbers);

    //when
    const nothing = nothingLotto.compare(winningNumbers, bonusNumber);

    //then
    expect(nothing).toBe(LottoRank.NOTHING);
  });

  test(`당첨번호가 ${LOTTO_DIGITS}개가 아니라면 에러를 반환한다.`, () => {
    //given
    const numbers = Array(LOTTO_DIGITS)
      .fill()
      .map((_, i) => i + 1);
    const lotto = new Lotto(numbers);

    const notValidWinningNumbers = Array(LOTTO_DIGITS - 1)
      .fill()
      .map((_, i) => i + 1);

    //when
    const whenCompareNotValidLength = () =>
      lotto.compare(notValidWinningNumbers, 1);

    //then
    expect(whenCompareNotValidLength).toThrow();
  });

  test("당첨번호 중 중복된 번호가 있다면 에러를 반환한다.", () => {
    //given
    const numbers = Array(LOTTO_DIGITS)
      .fill()
      .map((_, i) => i + 1);
    const lotto = new Lotto(numbers);

    const duplicated = 1;
    const winningNumbers = Array(LOTTO_DIGITS).fill(duplicated);

    //when
    const whenExistsDuplicated = () => lotto.compare(winningNumbers, 1);

    //then
    expect(whenExistsDuplicated).toThrow();
  });

  test("당첨번호가 1~45 사이의 숫자가 아니라면 에러를 반환한다.", () => {
    //given
    const numbers = Array(LOTTO_DIGITS)
      .fill()
      .map((_, i) => i + 1);
    const lotto = new Lotto(numbers);

    const outOfRange = 46;
    const winningNumbers = Array(LOTTO_DIGITS - 1)
      .fill()
      .map((_, i) => i + 1)
      .push(outOfRange);

    //when
    const whenExistsOutOfRange = () => lotto.compare(winningNumbers, 1);

    //then
    expect(whenExistsOutOfRange).toThrow();
  });

  test("보너스 번호가 1~45 사이의 숫자가 아니라면 에러를 반환한다.", () => {
    //given
    const numbers = Array(LOTTO_DIGITS)
      .fill()
      .map((_, i) => i + 1);
    const lotto = new Lotto(numbers);

    const winningNumbers = Array(LOTTO_DIGITS)
      .fill()
      .map((_, i) => i + 1);
    const wrongBonusNumber = 46;

    //when
    const whenExistsOutOfRange = () =>
      lotto.compare(winningNumbers, wrongBonusNumber);

    //then
    expect(whenExistsOutOfRange).toThrow();
  });
});
