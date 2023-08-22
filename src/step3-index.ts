import '@src/css/index.css';
import { LottoGame } from '@step1/model';
import LottoApplicationController from '@step3/controller/LottoApplicationController';

const lottoGame = new LottoGame();
new LottoApplicationController(lottoGame);
