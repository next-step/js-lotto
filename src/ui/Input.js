import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { generateLottoNumbers } from "../domain/generateLottoNumbers.js";
import LottoResult from "../domain/LottoResult.js";
import Lotto from "../domain/Lotto.js";

export const rl = readline.createInterface({ input, output });
const LOTTO_PRICE = 1000;

export const buyLotto = async (readlineInput) => {
  const purchaseAmount = await readlineInput.question(
    "구입금액을 입력해 주세요."
  );

  const lottoCount = purchaseAmount / LOTTO_PRICE;
  if (lottoCount < 1) {
    throw new Error(
      `로또는 1장에 ${LOTTO_PRICE}원 입니다. 금액을 확인해주세요.`
    );
  }

  console.log(`${purchaseAmount / LOTTO_PRICE}개를 구매했습니다.`);
  const lottoList = Array.from({ length: lottoCount }).map(() =>
    generateLottoNumbers()
  );
  lottoList.forEach((lotto) => console.log(lotto));

  return lottoList;
};

export const makeLottoResult = async (readlineInput) => {
  const lottoResultNumberAnswer = await readlineInput.question(
    "당첨 번호를 입력해 주세요."
  );
  const lottoBonusNumberAnswer = await readlineInput.question(
    "보너스 번호를 입력해 주세요."
  );

  const lottoResultNumber = lottoResultNumberAnswer
    .split(",")
    .map((value) => Number(value.trim()));
  const lottoBonusNumber = Number(lottoBonusNumberAnswer);

  return new LottoResult(new Lotto(lottoResultNumber), lottoBonusNumber);
};
