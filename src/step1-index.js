import LottoWinning from "./domain/LottoWinning.js";
import { buyLotto, makeLottoResult, rl } from "./ui/Input.js";
import { printLottoWinningResult } from "./ui/Output.js";

const main = async () => {
  const readlineInput = rl;

  try {
    const lottoNumberList = await buyLotto(readlineInput);
    const lottoResult = await makeLottoResult(readlineInput);
    const lottoWinningList = lottoNumberList.map((lottoNumber) => {
      return new LottoWinning(
        lottoNumber,
        lottoResult.resultNumbers,
        lottoResult.bonusNumber
      );
    });
    printLottoWinningResult(lottoWinningList);
  } catch (error) {
    console.log(error);
  } finally {
    readlineInput.close();
  }
};

main();
