import InputOutput from "./view/inputoutput.js";
import LottoMachine from "./domain/LottoMachine.js";
import LottoConfirmation from "./domain/LottoConfirmation.js";
import PrizeLotto from "./domain/PrizeLotto.js";

const main = async () => {
    const io = new InputOutput();
    const price = await io.receivedPrice();

    const lottoMachine = new LottoMachine(price);
    io.printLottos(lottoMachine.getLottos);

    const prizeNum = await io.receivedPrizeLottoNum(); 
    const bonusNum = await io.receivedBonusLottoNum();

    const prizeLotto = new PrizeLotto(prizeNum, bonusNum);
    const lottoConfirmation = new LottoConfirmation(lottoMachine.getLottos, prizeLotto);

    io.lottoResult(lottoConfirmation.getLottoResults);
    console.log(price);
    
    io.printRateOfReturn(lottoConfirmation.calculateRateOfReturn(price));

    io.closeInterface(); 
}

main();