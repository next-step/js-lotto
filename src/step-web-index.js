import * as io from "./view/inputoutput.js"
import LottoMachine from "./domain/lottoMachine.js";
import LottoConfirmation from "./domain/lottoConfirmation.js";
import PrizeLotto from "./domain/PrizeLotto.js";

const main = async () => {
    const readline = io.createInterface();

    let continueRunning = true;

    while (continueRunning) { 
        const price = await io.receivedPrice(readline);

        const lottoMachine = new LottoMachine(price);
        io.printLottos(lottoMachine.getLottos);

        const prizeNum = await io.receivedPrizeLottoNum(readline);
        const bonusNum = await io.receivedBonusLottoNum(readline);

        const prizeLotto = new PrizeLotto(prizeNum, bonusNum);
        const lottoConfirmation = new LottoConfirmation(lottoMachine.getLottos, prizeLotto);

        io.lottoResult(lottoConfirmation.getLottoResults);
        console.log(price);
        io.printRateOfReturn(lottoConfirmation.calculateRateOfReturn(price));

        continueRunning = await io.restart(readline);
    }

    readline.close();
}

main();