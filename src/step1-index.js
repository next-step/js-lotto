import * as io from "./view/inputoutput.js"
import LottoMachine from "./domain/lottoMachine.js";
import LottoConfirmation from "./domain/lottoConfirmation.js";
import Lotto from "./domain/lotto.js";

const main = async () => {
    const readline = io.createInterface();
    const price = await io.receivedPrice(readline);

    const lottoMachine = new LottoMachine(price);

    io.printLottos(lottoMachine.lottos);

    const prizeNum = await io.receivedPrizeLottoNum(readline);
    const bonusNum = await io.receivedBonusLottoNum(readline);

    const lottoConfirmation = new LottoConfirmation(lottoMachine.lottos, prizeNum, bonusNum);

    io.lottoResult(lottoConfirmation.getLottoResult);

    console.log(price)
    
    io.printRateOfReturn(lottoConfirmation.calculateRateOfReturn(price));

    readline.close();
}

main();