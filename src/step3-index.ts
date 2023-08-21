import '@src/css/index.css';
import { LottoGame } from '@step1/model';
import BuyLottoController from '@step3/controller/BuyLottoController';
import ConfirmLottoController from '@step3/controller/ConfirmLottoController';

const lottoGame = new LottoGame();
new BuyLottoController(lottoGame);
new ConfirmLottoController(lottoGame);
