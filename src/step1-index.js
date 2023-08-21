import { ERROR_MARKER } from './domain/constants/index';
import { LottoCustomer } from './domain/classes/index';
import { startPrompter, endPrompter } from './domain/lottoPrompter';

const lottoApp = async () => {
  try {
    const { lottoNumber, bonusNumber, purchaseAmount } = await startPrompter();
    const lottoCustomer = new LottoCustomer(purchaseAmount);
  } catch (error) {
    console.log(`${ERROR_MARKER} ${error}`);
  } finally {
    endPrompter();
  }
};

lottoApp();
