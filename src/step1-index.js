import { BASE_LOTTO_PRICE } from "./domains/LottoMachine/constants/index.js";
import { LottoMachine } from "./domains/LottoMachine/index.js";
import { readLineAsync } from "./ui/utils/readLineAsync.js";

const RANKS = [1, 2, 3, 4, 5];

const RANK_WINNING_PRICE_MAP = {
  1: 2_000_000_000,
  2: 30_000_000,
  3: 1_500_000,
  4: 50_000,
  5: 5_000,
};

const RANK_MATCHING_COUNT_MAP = {
  1: 6,
  2: 5,
  3: 5,
  4: 4,
  5: 3,
};

const play = async () => {
  const purchasePrice = await readLineAsync("구입금액을 입력해 주세요.");

  const lottoMachine = new LottoMachine(BASE_LOTTO_PRICE);
  const lottos = lottoMachine.issueLottos(purchasePrice);

  print(`${lottos.length}개를 구매했습니다.`);
  printLottos(lottos);
  console.log();

  const winningNumbers = await readLineAsync("당첨 번호를 입력해 주세요.");
  console.log();

  const bonusNumber = await readLineAsync("보너스 번호를 입력해 주세요.");
  console.log();

  const lottoResult = getLottoResult(lottos, winningNumbers, bonusNumber);

  printStatistics(lottoResult, purchasePrice);
};

play();

function print(text) {
  console.log(text);
}

function printLottos(lottos) {
  lottos.forEach((lotto) => {
    console.log(lotto.numbers);
  });
}

function getLottoResult(lottos, winningNumbers, bonusNumber) {
  const lottoResult = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const lotto of lottos) {
    const lottoResult = lotto.evaluateLotto(winningNumbers, bonusNumber);
    switch (lottoResult.matchingCount) {
      case 3:
        lottoResult[5] += 1;
        break;
      case 4:
        lottoResult[4] += 1;
        break;
      case 5:
        if (lottoResult.isBonusNumberMatched) {
          lottoResult[2] += 1;
        } else {
          lottoResult[3] += 1;
        }
        break;
      case 6:
        lottoResult[1] += 1;
        break;
      default:
        break;
    }
  }

  return lottoResult;
}

function printStatistics(lottoResult, purchasePrice) {
  console.log("당첨 통계");
  console.log("--------------------");

  RANKS.reverse().forEach((rank) => {
    console.log(
      `${RANK_MATCHING_COUNT_MAP[rank]}개 일치${
        rank === 2 ? ", 보너스 볼 일치" : ""
      } (${RANK_WINNING_PRICE_MAP[rank].toLocaleString()}원) - ${
        lottoResult[rank]
      }개`
    );
  });

  console.log();

  const totalPrice = RANKS.reduce((totalAmount, rank) => {
    return totalAmount + RANK_WINNING_PRICE_MAP[rank] * lottoResult[rank];
  }, 0);

  console.log(
    `총 수익률은 ${((totalPrice * 100) / purchasePrice).toFixed(1)}%입니다.`
  );
}
