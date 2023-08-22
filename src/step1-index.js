import { ERROR_MARKER, LOTTO_MODE } from './domain/constants/index';
import { LottoCustomer, LottoTicket, LottoSeller, LottoOrganizer } from './domain/classes/index';
import { startPrompter, endPrompter } from './domain/lottoPrompter';

const lottoApp = async () => {
  try {
    const { lottoNumber, bonusNumber, purchaseAmount } = await startPrompter();
    const lottoOrganizer = new LottoOrganizer();
    const lottoCustomer = new LottoCustomer(purchaseAmount, LOTTO_MODE.AUTO);
    const lottoSeller = new LottoSeller(lottoOrganizer);
    lottoCustomer.buyLottoTicket(lottoSeller);
  } catch (error) {
    console.log(`${ERROR_MARKER} ${error}`);
  } finally {
    endPrompter();
  }
};

lottoApp();
