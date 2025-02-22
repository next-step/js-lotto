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

    const prizeNum = await console.receivedPrizeLottoNum(); 
    const bonusNum = await console.receivedBonusLottoNum();

    const prizeLotto = new PrizeLotto(prizeNum, bonusNum);
    const lottoConfirmation = new LottoConfirmation(lottoMachine.lottos, prizeLotto);

    console.lottoResult(lottoConfirmation.lottoResults);
    
    console.printRateOfReturn(lottoConfirmation.calculateRateOfReturn());

    console.closeInterface(); 
}

main();