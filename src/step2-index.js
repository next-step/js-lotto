import { exit } from 'node:process';
import lottoApp from './domain/lottoApp';
import {
  executeReadRetryAppKey,
  endPrompter,
  createWinningRateMessage,
  createLottoStatisticsMessage
} from './domain/services/index';
import { ALERT_MESSAGE, APP_EXIT_KEY } from './domain/constants/index.js';
import { printMessage, printMessageList } from './view/cliViewer';

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
