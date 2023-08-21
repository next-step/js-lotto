import '@src/css/index.css';
import { LottoGame } from '@step1/model';
import BuyLottoController from '@step3/controller/BuyLottoController';

const lottoGame = new LottoGame();
new BuyLottoController(lottoGame);
