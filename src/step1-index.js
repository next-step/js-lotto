import { generateLottoNumbers } from "./domain/generateLottoNumbers.js";
import Lotto from "./domain/Lotto.js";
import LottoResult from "./domain/LottoResult.js";
import { buyLotto, makeLottoResult, rl } from "./ui/Input.js";

const main = async () => {
  const readlineInput = rl;

  try {
    const lottoList = await buyLotto(readlineInput);
    const lottoResult = await makeLottoResult(readlineInput);
    const lottoWinningResult = lottoList.map((lotto) => {
      return {
        matchedNumber: lottoResult.matchResultNumbers(lotto),
        isMatchedBonusNumber: lottoResult.matchBonusNumber(lotto),
      };
    });
    console.log("lottoWinningResult: ", lottoWinningResult);
    // TODO: 로또 등수 확인
  } catch (error) {
    console.log(error);
  } finally {
    readlineInput.close();
  }
};

main();
