import { LottoStore } from "./domain/lotto-store.js";
import { readLineAsync } from "./view/input.js";
import { printLotto } from "./view/output.js";

const lottoPrice = await readLineAsync("구매금액을 입력해 주세요.");
const lottoStore = new LottoStore(lottoPrice);
const lottoList = lottoStore.sell();
printLotto(lottoList);

const winningNumber = await readLineAsync("당첨 번호를 입력해 주세요.");
const bonusNumber = await readLineAsync("보너스 번호를 입력해 주세요.");
