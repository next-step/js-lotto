import Lotto from "./js/domain/Lotto";
import LottoResult from "./js/domain/LottoResult";
import Input from "./js/view/Input";
import Output from "./js/view/Output";

// 로또를 구입할 금액 입력
const purchasedAmount = await Input.getLottoPurchasedAmount();

// 로또를 구입한 금액만큼 최대 개수의 로또 발급
const availableLottoCount = Lotto.getAvailableLottoCount(purchasedAmount);
const lottos = [];

for (let i = 0; i < availableLottoCount; i++) {
  const lottoNumbers = Lotto.generateLottoNumbers();
  lottos.push(new Lotto(lottoNumbers));
}

// 로또를 발급한 개수 출력
Output.printGeneratedLottosCount(lottos.length);

// 발급한 로또들의 각 로또 번호들을 출력
Output.printGeneratedLottosNumbers(lottos);

// 당첨 번호 입력
const winningNumbers = await Input.getWinningNumbers();

// 보너스 번호 입력
const bonusNumber = await Input.getBonusNumber(winningNumbers);

// 로또 당첨 결과 생성
const lottoResult = new LottoResult(winningNumbers, bonusNumber);

// 로또 당첨 결과 통계 출력
const lottoRankingStatistics = lottoResult.getLottoRankingStatistics(lottos);
Output.printLottoRankingStatistics(lottoRankingStatistics);

// 로또 수익률 출력
const totalLottoWinningPrice = lottoResult.getTotalLottoWinningPrice(lottos);
const totalLottoProfitRate = LottoResult.getTotalLottoProfitRate(
  totalLottoWinningPrice,
  purchasedAmount
);
Output.printLottoProfitRate(totalLottoProfitRate);
