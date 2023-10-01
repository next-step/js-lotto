import errorFallback from './models/error/errorFallback.js';
import { LottoCustomer, LottoSeller, LottoOrganizer, LottoMachine, LottoCalculator } from './models/index';
import { createPurchaseMessage, readPurchaseAmount, readLottoNumberAndBonusNumber } from './services/index';

const buyLottoTicket = async () => {
  try {
    const purchaseAmount = await readPurchaseAmount();
    const lottoCustomer = new LottoCustomer(purchaseAmount);
    const lottoSeller = new LottoSeller(LottoOrganizer.lottoPrice());
    lottoCustomer.buyAutoLottoTicket(lottoSeller);
    return lottoCustomer;
  } catch (error) {
    errorFallback(error);
    return buyLottoTicket();
  }
};

const printPurchaseLottoTickets = (lottoTickets) => {
  const lottoNumbers = lottoTickets.map(({ lottoNumber }) => lottoNumber);
  console.log(createPurchaseMessage(lottoTickets.length));
  lottoNumbers.forEach((lottoNumber) => {
    console.log(lottoNumber.sort((a, b) => a - b));
  });
};

const asyncSetupLottoMachine = async () => {
  try {
    const { lottoNumber, bonusNumber } = await readLottoNumberAndBonusNumber();
    return new LottoMachine(lottoNumber, bonusNumber);
  } catch (error) {
    errorFallback(error);
    return asyncSetupLottoMachine();
  }
};

const calculateLottoWiningRate = (lottoMachine, lottoTickets) => {
  const lottoCalculator = new LottoCalculator(lottoMachine.winningLottoNumber, lottoMachine.bonusNumber);
  const lottoOrganizer = new LottoOrganizer(lottoCalculator);
  lottoOrganizer.matchToLottoTickets(lottoTickets);
  return lottoOrganizer.getWinningReturnRate(lottoTickets);
};

const lottoApp = async () => {
  try {
    const purchasedLottoCustomer = await buyLottoTicket();
    printPurchaseLottoTickets(purchasedLottoCustomer.lottoTickets);
    const lottoMachine = await asyncSetupLottoMachine();
    const winningRate = calculateLottoWiningRate(lottoMachine, purchasedLottoCustomer.lottoTickets);
    const lottoTickets = purchasedLottoCustomer.lottoTickets.map(({ lottoNumber, result }) => ({
      lottoNumber,
      result
    }));

    return {
      winningRate,
      lottoTickets
    };
  } catch (error) {
    errorFallback(error);
  }
};

export default lottoApp;
