import { exit } from 'node:process';
import lottoApp from './domain/lottoApp';
import { executeReadRetryAppKey, endPrompter } from './domain/lottoPrompter';
import { createWinningRateMessage, createLottoStatisticsMessage } from './domain/lottoMessageCreator';
import { ALERT_MESSAGE, APP_EXIT_KEY } from './domain/constants/index';
import { printMessage, printMessageList } from './view/viewer';

const executeLottoApp = async () => {
  try {
    const { winningRate, lottoTickets } = await lottoApp();
    printMessage(ALERT_MESSAGE.STATISTICS_TITLE_MESSAGE);
    printMessage('--------------------');
    printMessageList(createLottoStatisticsMessage(lottoTickets), false);
    printMessage(createWinningRateMessage(winningRate));

    const inputKey = await executeReadRetryAppKey();
    if (inputKey === APP_EXIT_KEY) {
      endPrompter();
      exit(1);
    }

    executeLottoApp();
  } catch (error) {
    printMessage(error);
  }
};

executeLottoApp();
