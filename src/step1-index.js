import lottoApp from './domain/lottoApp';
import { createWinningRateMessage, createLottoStatisticsMessage } from './domain/services/index';
import { ALERT_MESSAGE } from './domain/constants/index.js';
import { printMessage, printMessageList } from './view/cliViewer';

const { winningRate, lottoTickets } = await lottoApp();

printMessage(ALERT_MESSAGE.STATISTICS_TITLE_MESSAGE);
printMessage('--------------------');
printMessageList(createLottoStatisticsMessage(lottoTickets), false);
printMessage(createWinningRateMessage(winningRate));
