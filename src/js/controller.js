import { ERROR_MESSAGE, PROMPT_MESSAGE_SELF_AMOUNT } from './constants.js';
import { checkNumber, hide, show } from './utils.js';
import LottoForm from './view/LottoForm.js';
import LottoInfo from './view/LottoInfo.js';
import PriceForm from './view/PriceForm.js';
import ResultModal from './view/ResultModal.js';
import SelfLottoForm from './view/SelfLottoForm.js';

export default class Controller {
  constructor(model) {
    this.model = model;

    this.LottoForm = new LottoForm();
    this.LottoInfo = new LottoInfo();
    this.PriceForm = new PriceForm();
    this.ResultModal = new ResultModal();
    this.SelfLottoForm = new SelfLottoForm();

    this.LottoInfo.bindOnClickToggleButton(this.onClickToggleButton);
    this.PriceForm.bindOnClickPurchaseButton(this.onClickPurchaseButton);
    this.LottoForm.bindOnClickGetResultButton(this.onClickResultButton);
    this.ResultModal.bindOnClickBlackout(this.onClickBlackout);
    this.ResultModal.bindOnClickRetryButton(this.onClickRetryButton);
    this.ResultModal.bindOnClickCancelButton(this.onClickCancelButton);
    this.SelfLottoForm.bindOnClickSelfGenerateButton(this.onClickSelfGenerateButton);
  }

  onClickPurchaseButton = (event) => {
    event.preventDefault();
    const price = this.PriceForm.$moneyInput.value;
    if (price.length === 0) throw Error(ERROR_MESSAGE.NO_INPUT);
    this.model.setAmount(Number(price));

    const selfGeneratedAmount = window.prompt(PROMPT_MESSAGE_SELF_AMOUNT);
    if (selfGeneratedAmount > this.model.data.amount) throw ERROR_MESSAGE.MAX_LOTTO_AMOUNT;
    if (selfGeneratedAmount.length === 0) throw ERROR_MESSAGE.NO_INPUT;
    if (selfGeneratedAmount < 0) throw ERROR_MESSAGE.MIN_LOTTO_AMOUNT;

    this.SelfLottoForm.updateAmountMessgae(this.model.data.amount - selfGeneratedAmount, selfGeneratedAmount);
    this.SelfLottoForm.createSelfLottoForm(selfGeneratedAmount);
    this.model.setAutoLottos(this.model.data.amount - selfGeneratedAmount);

    show(this.SelfLottoForm.$selfLottoList);
  };

  onClickToggleButton = () => {
    this.LottoInfo.$$lottoDetail.forEach((item) => {
      item.style.display = item.style.display === 'none' ? '' : 'none';
    });
  };

  onClickResultButton = (winningNumbers, bonusNumber) => {
    this.LottoForm.checkLottoNumber(winningNumbers, bonusNumber);
    this.ResultModal.openModal();
    this.model.setResult(winningNumbers, bonusNumber);
    this.model.setProfit();
    this.model.setProfitMessage(this.ResultModal.$profitMessage);
    this.ResultModal.updateModal(this.model.data.result);
  };

  onClickRetryButton = () => {
    this.model.init();
    this.SelfLottoForm.init();
    this.PriceForm.clearInput();
    this.LottoForm.clearInput();
    this.ResultModal.closeModal();
    hide(this.LottoForm.$lottoInputForm);
    hide(this.LottoInfo.$lottoInfoSection);
  };

  onClickBlackout = (event, $resultModal) => {
    if (event.target === $resultModal && $resultModal.classList.contains('open')) {
      this.ResultModal.closeModal();
      this.model.initResult();
    }
  };

  onClickCancelButton = () => {
    this.ResultModal.closeModal();
    this.model.initResult();
  };

  onClickSelfGenerateButton = () => {
    this.SelfLottoForm.$selfLottoInputContainer.forEach(($oneLottoList) => {
      const oneSelfLottoValues = [];
      $oneLottoList.querySelectorAll('input').forEach(($lottoInput) => {
        const lottoNumber = $lottoInput.value;

        checkNumber(lottoNumber);

        if (oneSelfLottoValues.includes(lottoNumber)) throw ERROR_MESSAGE.DUPLICATED_NUMBER;
        oneSelfLottoValues.push(Number(lottoNumber));
      });
      this.model.data.lottos.push(oneSelfLottoValues);
    });

    this.PriceForm.updatePurchaseMessage(this.model.data.amount);
    this.LottoInfo.updateLottoList(this.model.data.lottos);

    show(this.LottoForm.$lottoInputForm);
    show(this.LottoInfo.$lottoInfoSection);
  };
}
