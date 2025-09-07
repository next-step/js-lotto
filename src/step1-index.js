import { BASE_LOTTO_PRICE } from "./domains/LottoMachine/constants/index.js";
import { LottoMachine } from "./domains/LottoMachine/index.js";
import { readLineAsync } from "./ui/utils/readLineAsync.js";

const play = async () => {
  const amount = await readLineAsync("구입금액을 입력해 주세요.");

  const lottoMachine = new LottoMachine(BASE_LOTTO_PRICE);
  const lottos = lottoMachine.issueLottos(amount);

  print(`${lottos.length}개를 구매했습니다.`);
  printLottos(lottos);
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
