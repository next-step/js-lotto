import Lotto from "./js/domain/Lotto";
import LottoGame from "./js/domain/LottoGame";
import LottoMachine from "./js/domain/LottoMachine";
import LottoNumber from "./js/domain/LottoNumber";
import LottoResult from "./js/domain/LottoResult";
import WinningLotto from "./js/domain/WinningLotto";
import Input from "./js/view/console/Input.js";
import Output from "./js/view/console/Output.js";
import repeatUntilNoError from "./utils/repeatUntilNoError";

const play = async () => {
  // 로또를 구입할 금액 입력
  const purchasedAmount = await repeatUntilNoError(async () => {
    const input = await Input.getLottoPurchasedAmount();
    LottoGame.validateLottoPurchasedAmount(input);
    return input;
  });

  // 로또를 구입한 금액만큼 최대 개수의 로또 발급
  const availableLottoCount =
    LottoGame.getPurchasableLottoCount(purchasedAmount);

  const lottos = [];
  for (let i = 0; i < availableLottoCount; i++) {
    const lotto = LottoMachine.generateRandomLotto();
    lottos.push(lotto);
  }

  // 로또를 발급한 개수 출력
  Output.printGeneratedLottosCount(lottos.length);

  // 발급한 로또들의 각 로또 번호들을 오름차순으로 출력
  Output.printGeneratedLottosNumbers(lottos.map((lotto) => lotto.lottoNumbers));

  // 당첨 번호 입력
  const lotto = await repeatUntilNoError(async () => {
    const input = await Input.getWinningLottoNumbers();
    return new Lotto(input);
  });

  // 보너스 번호 입력
  const bonusNumber = await repeatUntilNoError(async () => {
    const input = await Input.getBonusNumber();
    return new LottoNumber(input);
  });

  // 당첨 로또 생성
  const winningLotto = await repeatUntilNoError(async () => {
    const winningLotto = new WinningLotto(lotto, bonusNumber);
    return winningLotto;
  });

  // 로또 당첨 결과 생성
  const lottoResult = new LottoResult(winningLotto);

  // 로또 당첨 결과 통계 출력
  const lottoRankings = [
    LottoResult.LottoRanking["FIFTH"],
    LottoResult.LottoRanking["FOURTH"],
    LottoResult.LottoRanking["THIRD"],
    LottoResult.LottoRanking["SECOND"],
    LottoResult.LottoRanking["FIRST"],
  ];

  const lottoRankingStatistics = lottoRankings.map((lottoRanking) => {
    const lottoRankingInfo = LottoResult.LottoRankingInfo[lottoRanking];
    const lottoRankingCount = lottoResult.getLottoRankingCount(
      lottos,
      lottoRanking
    );

    return {
      count: lottoRankingCount,
      rankingWinningPrice: lottoRankingInfo.winningPrice,
      rankingCondition: lottoRankingInfo.condition,
      isShowExtraMent: lottoRanking === LottoResult.LottoRanking["SECOND"],
    };
  });

  Output.printLottoRankingStatistics(lottoRankingStatistics);

  // 로또 수익률 출력
  const totalLottoWinningPrice = lottoResult.getTotalLottoWinningPrice(lottos);
  const totalLottoProfitRate = LottoResult.getTotalLottoProfitRate(
    totalLottoWinningPrice,
    purchasedAmount
  );
  Output.printLottoProfitRate(totalLottoProfitRate);
};

const main = async () => {
  while (true) {
    // 로또 게임 시작
    await play();

    //  재시작/종료 여부를 입력받는다.
    const isRestartLottoGame = await repeatUntilNoError(async () => {
      const input = await Input.getIsRestartLottoGame();
      LottoGame.validateIsRestartLottoGame(input);
      return isRestartLottoGame === LottoGame.RESTART_GAME_TRUE;
    });
    if (!isRestartLottoGame) {
      break;
    }
  }
};

main();
