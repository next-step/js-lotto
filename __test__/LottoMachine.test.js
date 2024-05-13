// import LottoMachine from "../src/js/domain/LottoMachine.js";
import { WinningLotto } from "../src/js/domain/WinningLotto.js";

test("입력한 금액에 맞게 로또를 발급해준다.", () => {
  //   // given
  //   const amount = 2000;
  //   // when
  //   const lottoMachine = new LottoMachine();
  //   const issueLottos = lottoMachine.generateLottoNumber(amount);
  //   console.log(Array.isArray(issueLottos));
  //   // then
  //   // 1. 숫자 6개 발급
  //   issueLottos.forEach((lotto) => {
  //     expect(lotto.length).toBe(6);
  //   });
  //   // 2. 1과 45 사이
  //   // 3. 2개 의 로또 발급
});

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
