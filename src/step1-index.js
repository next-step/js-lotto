import lottoApp from './domain/lottoApp';
import { createWinningRateMessage, createLottoStatisticsMessage } from './domain/lottoMessageCreator';
import { ALERT_MESSAGE } from './domain/constants/index';
import { printMessage, printMessageList } from './view/viewer';

const { winningRate, lottoTickets } = await lottoApp();

printMessage(ALERT_MESSAGE.STATISTICS_TITLE_MESSAGE);
printMessage('--------------------');
printMessageList(createLottoStatisticsMessage(lottoTickets), false);
printMessage(createWinningRateMessage(winningRate));
