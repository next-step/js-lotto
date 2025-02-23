import ConsoleView from "./view/ConsoleView.js";
import LottoMachine from "./domain/LottoMachine.js";
import LottoConfirmation from "./domain/LottoConfirmation.js";
import PrizeLotto from "./domain/PrizeLotto.js";

const main = async () => {
    const console = new ConsoleView();
    const price = await console.receivedPrice();

    const lottoMachine = new LottoMachine(price);
    lottoMachine.buyAuto();
    console.printLottos(lottoMachine.lottosValue);

    const prizeNumber = await console.receivedPrizeLottoNumber(); 
    const bonusNumber = await console.receivedBonusLottoNumber();

    const prizeLotto = new PrizeLotto(prizeNumber, bonusNumber);
    const lottoConfirmation = new LottoConfirmation(lottoMachine.lottos, prizeLotto);

    console.lottoResult(lottoConfirmation.lottoResults);
    
    console.printRateOfReturn(lottoConfirmation.calculateRateOfReturn());

    console.closeInterface(); 
}

main();