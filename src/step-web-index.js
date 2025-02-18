import InputOutput from "./view/inputoutput.js";
import LottoMachine from "./domain/lottoMachine.js";
import LottoConfirmation from "./domain/lottoConfirmation.js";
import PrizeLotto from "./domain/PrizeLotto.js";
import Lotto from "./domain/Lotto.js";

const main = async () => {
    const io = new InputOutput();
    let continueRunning = true;

    while (continueRunning) {
        const price = await io.receivedPrice();

        const lottoMachine = new LottoMachine(price);

        if (await io.b()) {
            lottoMachine.buyAuto();
        } else {
            const lottos = [];
            for (let i = 0; i < lottoMachine.getLottoNum; i++) {
                lottos.push(new Lotto(await io.receivedLottoNum()));
            }
            lottoMachine.buyManual(lottos);
        }

        io.printLottos(lottoMachine.getLottos);

        const prizeNum = await io.receivedPrizeLottoNum();
        const bonusNum = await io.receivedBonusLottoNum();

        const prizeLotto = new PrizeLotto(prizeNum, bonusNum);
        const lottoConfirmation = new LottoConfirmation(lottoMachine.getLottos, prizeLotto);

        io.lottoResult(lottoConfirmation.getLottoResults);
        io.printRateOfReturn(lottoConfirmation.calculateRateOfReturn(price));

        continueRunning = await io.restart();
    }

    io.closeInterface();
}

main();