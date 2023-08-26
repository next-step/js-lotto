import { ERROR_MARKER } from './constants/index';
import { createPurchaseMessage } from './lottoMessageCreator';
import { LottoCustomer, LottoSeller, LottoOrganizer, LottoMachine, LottoCalculator } from './classes/index';
import { readPurchaseAmount, readLottoNumberAndBonusNumber, endPrompter } from './lottoPrompter';

const lottoApp = async () => {
  try {
    const { purchaseAmount } = await readPurchaseAmount();
    const lottoCustomer = new LottoCustomer(purchaseAmount);
    const lottoSeller = new LottoSeller();
    lottoCustomer.buyAutoLottoTicket(lottoSeller);
    const lottoNumbers = lottoCustomer.lottoTickets.map(({ lottoNumber }) => lottoNumber);
    console.log(createPurchaseMessage(lottoCustomer.lottoTickets.length));
    lottoNumbers.forEach((lottoNumber) => {
      console.log(lottoNumber.sort((a, b) => a - b));
    });

    const { lottoNumber: winningLottoNumber, bonusNumber } = await readLottoNumberAndBonusNumber();
    const lottoMachine = new LottoMachine(winningLottoNumber, bonusNumber);
    const lottoCalculator = new LottoCalculator(lottoMachine.winningLottoNumber, lottoMachine.bonusNumber);
    const lottoOrganizer = new LottoOrganizer(lottoCalculator);
    lottoOrganizer.matchToLottoTickets(lottoCustomer.lottoTickets);

    const winningRate = lottoOrganizer.getWinningReturnRate(lottoCustomer.lottoTickets);
    const lottoTickets = lottoCustomer.lottoTickets.map(({ lottoNumber, result }) => ({ lottoNumber, result }));

    return {
      winningRate,
      lottoTickets
    };
  } catch (error) {
    console.log(`${ERROR_MARKER} ${error}`);
  } finally {
    endPrompter();
  }
};

export default lottoApp;
