import Lotto from "./js/domain/Lotto";
import LottoGame from "./js/domain/LottoGame";
import LottoNumber from "./js/domain/LottoNumber";
import LottoResult from "./js/domain/LottoResult";
import Input from "./js/view/Input";
import Output from "./js/view/Output";

while (true) {
  // 로또를 구입할 금액 입력
  const purchasedAmount = await Input.getLottoPurchasedAmount();

  // 로또를 구입한 금액만큼 최대 개수의 로또 발급
  const availableLottoCount =
    LottoGame.getPurchasableLottoCount(purchasedAmount);

  const lottos = [];
  for (let i = 0; i < availableLottoCount; i++) {
    const lottoNumbers = LottoNumber.generateRandomLottoNumbers();
    lottos.push(new Lotto(lottoNumbers));
  }

  // 로또를 발급한 개수 출력
  Output.printGeneratedLottosCount(lottos.length);

  // 발급한 로또들의 각 로또 번호들을 오름차순으로 출력
  const sortedLottosNumbers = lottos.map((lotto) =>
    LottoNumber.sortLottoNumbersByAscendingOrder(lotto.numbers)
  );
  Output.printGeneratedLottosNumbers(sortedLottosNumbers);

  // 당첨 번호 입력
  const winningNumbers = await Input.getWinningNumbers();

  // 보너스 번호 입력
  const bonusNumber = await Input.getBonusNumber(winningNumbers);

  // 로또 당첨 결과 생성
  const lottoResult = new LottoResult(winningNumbers, bonusNumber);

  // 로또 당첨 결과 통계 출력
  const lottoRankingsCounts = lottoResult.getLottoRankingsCounts(lottos);
  const lottoRankingsStatistics = lottoRankingsCounts
    .map((count, ranking) => {
      if (ranking < LottoResult.LottoRanking[1].ranking) {
        return null;
      }

      return {
        count,
        rankingWinningPrice: LottoResult.LottoRanking[ranking].winningPrice,
        rankingCondition: LottoResult.LottoRanking[ranking].condition,
        isShowExtraMent:
          LottoResult.LottoRanking[ranking].ranking ===
          LottoResult.LottoRanking[2].ranking,
      };
    })
    .slice(LottoResult.LottoRanking[1].ranking)
    .reverse();

  Output.printLottoRankingStatistics(lottoRankingsStatistics);

  // 로또 수익률 출력
  const totalLottoWinningPrice = lottoResult.getTotalLottoWinningPrice(lottos);
  const totalLottoProfitRate = LottoResult.getTotalLottoProfitRate(
    totalLottoWinningPrice,
    purchasedAmount
  );
  Output.printLottoProfitRate(totalLottoProfitRate);

  //  재시작/종료 여부를 입력받는다.
  const isRestartLottoGame = await Input.getIsRestartLottoGame();
  if (!isRestartLottoGame) {
    break;
  }
}
