import ConsoleView from "./view/ConsoleView.js";
import LottoMachine from "./domain/LottoMachine.js";
import LottoConfirmation from "./domain/LottoConfirmation.js";
import PrizeLotto from "./domain/PrizeLotto.js";
import Lotto from "./domain/Lotto.js";

const main = async () => {
    const io = new ConsoleView();
    let continueRunning = true;

    while (continueRunning) {
        const price = await io.receivedPrice();

        const lottoMachine = new LottoMachine(price);

        if (await io.b()) {
            lottoMachine.buyAuto();
        } else {
            const lottos = [];
            for (let i = 0; i < lottoMachine.lottoNumer; i++) {
                lottos.push(new Lotto(await io.receivedLottoNumber()));
            }
            lottoMachine.buyManual(lottos);
        }

        io.printLottos(lottoMachine.getLottos);

        const prizeNumer = await io.receivedPrizeLottoNumber();
        const bonusNumer = await io.receivedBonusLottoNumber();

        const prizeLotto = new PrizeLotto(prizeNumer, bonusNumer);
        const lottoConfirmation = new LottoConfirmation(lottoMachine.lottos, prizeLotto);

        io.lottoResult(lottoConfirmation.getLottoResults);
        io.printRateOfReturn(lottoConfirmation.calculateRateOfReturn(price));

        continueRunning = await io.restart();
    }

    io.closeInterface();
}

main();