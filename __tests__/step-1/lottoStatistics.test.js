// import Lotto from "../../src/domain/Lotto";
// import hasDuplicate from "../../src/utils/hasDuplicate";
// import LottoTicket from "../../src/domain/LottoTicket";
// import LottoResult from "../../src/domain/LottoResult";
// import LottoStatistics from "../../src/domain/LottoStatistics";

// describe("로또 당첨 결과 테스트", () => {
//   let money = LOTTO_MONEY;
//   let lotto;
//   const winningNumbers = [1, 2, 3, 4, 5, 6];
//   const bonusNumber = 7;

//   const userChoiceNumber = [
//     [1, 2, 3, 4, 5, 6],
//     [2, 3, 4, 5, 6, 7],
//     [3, 4, 5, 6, 7, 8],
//   ];

//   let compareNumberResult = [
//     {
//       ticket: [1, 2, 3, 4, 5, 6],
//       matchedNumbers: [1, 2, 3, 4, 5, 6],
//       hasBonus: false,
//     },
//     {
//       ticket: [2, 3, 4, 5, 6, 7],
//       matchedNumbers: [2, 3, 4, 5, 6],
//       hasBonus: true,
//     },
//     {
//       ticket: [3, 4, 5, 6, 7, 8],
//       matchedNumbers: [3, 4, 5, 6],
//       hasBonus: true,
//     },
//   ];

//   beforeEach(() => {
//     lotto = new Lotto(money, LottoTicket);
//     jest.spyOn(lotto, "getLottoTicket").mockReturnValue(userChoiceNumber);
//   });

//   it("당첨 번호와 사용자의 번호를 비교한다.", () => {
//     const lottoResult = new LottoResult(winningNumbers, bonusNumber);

//     expect(lottoResult.compareNumber(lotto.getLottoTicket())).toEqual(
//       compareNumberResult
//     );
//   });

//   it("match된 값을 이용하여 등수를 알 수 있다..", () => {
//     const lottoStatistics = new LottoStatistics(winningNumbers);

//     const userLottoRank = lottoStatistics.getLottoRank([1, 2, 3, 4, 5, 6]);
//     const userLottoRank1 = lottoStatistics.getLottoRank([1, 2, 3, 4, 5], true);

//     expect(userLottoRank).toBe(1);
//     expect(userLottoRank1).toBe(2);
//   });

//   it("당첨 내역을 알 수 있다.", () => {});
// });
