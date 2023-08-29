import { Lotto, LottoStatistics } from '../src/lotto/index.js';
import runPurchase from './web/js/purchase.js';
import runStatistics from './web/js/statistics.js';

const lotto = new Lotto();
const lottoStatistics = new LottoStatistics();

const lottoAnswers = [];
let lottoBonus = '';

runPurchase(lotto);
runStatistics(lotto, lottoStatistics, lottoAnswers, lottoBonus);
