import { Lotto } from './js/domain/Lotto.js';
import { LottoMachine } from './js/domain/LottoMachine.js';
import { WinningLotto } from './js/domain/WinningLotto.js';
import LottoView from './js/view/LottoVIew.js';

const lottoView = new LottoView();
const lottoMachine = new LottoMachine();

const purchaseAmount = await lottoView.inputPurchaseAmount();
const lottos = lottoMachine.issueLotto(purchaseAmount);
lottoView.printPurchaseAmount(lottos);
const winningLottoNunbers = await lottoView.inputWinningNumber();
const winningLottoArray = winningLottoNunbers
  .split(',')
  .map((string) => parseInt(string));
const bonusNumber = await lottoView.inputBonusNumber();
const winningLotto = new WinningLotto(
  new Lotto(winningLottoArray),
  bonusNumber
);
const lottoResult = lottoMachine.checkWinningLotto(lottos, winningLotto);
lottoView.printLottoResult(lottoResult);
