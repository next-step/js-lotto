import { WinningLotto } from "../src/js/domain/WinningLotto.js";
import { LottoMachine } from "../src/js/domain/LottoMachine.js";

test("발급한 로또가 얼마나 일치하는지 갯수를 리턴한다.", () => {
  // given
  const lotto = [1, 2, 3, 4, 5, 6]; // 3개 당첨(5등)
  const winningLottoNumbers = [1, 2, 3, 11, 22, 33];
  const bonusNumber = 5;

  // when
  const winningLotto = new WinningLotto(winningLottoNumbers, bonusNumber);

  // then
  expect(winningLotto.calculateMatchLottoCount(lotto)).toBe(3);
});

test("보너스 번호가 일치하면 true", () => {
  //given
  const lotto = [1, 2, 3, 4, 5, 6]; // 4개 당첨(4등)
  const bonusNumber = 5;

  // when
  const winningLotto = new WinningLotto(lotto, bonusNumber);

  // then
  expect(winningLotto.isMatchBonus(lotto)).toBe(true);
});

test("금액을 입력하면, 로또 발급할 개수가 반환된다.", () => {
  // given
  const purchase = 2000;

  // when
  const lottoMachine = new LottoMachine();
  const count = lottoMachine.calculateLottoCount(purchase);

  // then
  expect(count).toBe(2);
});
