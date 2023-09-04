import { ERROR_MARKER } from './constants/index';
import { createPurchaseMessage } from './lottoMessageCreator';
import { LottoCustomer, LottoSeller, LottoOrganizer, LottoMachine, LottoCalculator } from './classes/index';
import { readPurchaseAmount, readLottoNumberAndBonusNumber, endPrompter } from './lottoPrompter';

const buyAndPrintLottoTickets = async (lottoCustomer, lottoSeller) => {
  lottoCustomer.buyAutoLottoTicket(lottoSeller);
  const lottoNumbers = lottoCustomer.lottoTickets.map(({ lottoNumber }) => lottoNumber);

  console.log(createPurchaseMessage(lottoCustomer.lottoTickets.length));
  lottoNumbers.forEach((lottoNumber) => {
    console.log(lottoNumber.sort((a, b) => a - b));
  });
};

const asyncSetupLottoMachine = async () => {
  const { lottoNumber: winningLottoNumber, bonusNumber } = await readLottoNumberAndBonusNumber();
  return new LottoMachine(winningLottoNumber, bonusNumber);
};

const calculateLottoWiningRate = (lottoMachine, lottoCustomer) => {
  const lottoCalculator = new LottoCalculator(lottoMachine.winningLottoNumber, lottoMachine.bonusNumber);
  const lottoOrganizer = new LottoOrganizer(lottoCalculator);
  lottoOrganizer.matchToLottoTickets(lottoCustomer.lottoTickets);
  return lottoOrganizer.getWinningReturnRate(lottoCustomer.lottoTickets);
};

const lottoApp = async () => {
  try {
    const { purchaseAmount } = await readPurchaseAmount();
    const lottoCustomer = new LottoCustomer(purchaseAmount);
    const lottoSeller = new LottoSeller();

    buyAndPrintLottoTickets(lottoCustomer, lottoSeller);
    const lottoMachine = await asyncSetupLottoMachine();
    const winningRate = calculateLottoWiningRate(lottoMachine, lottoCustomer);
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
