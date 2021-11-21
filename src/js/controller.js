import {
  ERROR_MESSAGE,
} from "./constants.js";
import LottoForm from "./view/LottoForm.js";
import LottoInfo from "./view/LottoInfo.js";
import PriceForm from "./view/PriceForm.js";
import ResultModal from "./view/ResultModal.js";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.LottoForm = new LottoForm();
    this.LottoInfo = new LottoInfo();
    this.PriceForm = new PriceForm();
    this.ResultModal = new ResultModal();

    this.LottoInfo.bindOnClickToggleButton(this.onClickToggleButton);
    this.PriceForm.bindOnClickPurchaseButton(this.onClickPurchaseButton);
    this.LottoForm.bindOnClickGetResultButton(this.onClickResultButton);
    this.ResultModal.bindOnClickBlackout(this.onClickBlackout);
  }

  onClickPurchaseButton = (event) => {
    event.preventDefault();
    const price = this.PriceForm.$moneyInput.value;
    if (price.length === 0) throw Error(ERROR_MESSAGE.NO_INPUT);

    this.model.setAmount(Number(price));
    this.model.setLottos();

    this.PriceForm.updatePurchaseMessage(this.model.data.amount);
    this.LottoInfo.updateLottoList(this.model.data.lottos);

    this.view.show(this.LottoForm.$lottoInputForm);
    this.view.show(this.LottoInfo.$lottoInfoSection);
  };

  onClickToggleButton = () => {
    this.LottoInfo.$$lottoDetail.forEach(item => {
      item.style.display = item.style.display === 'none' ? 'inline' : 'none';
    });
  };

  onClickResultButton = (winningNumbers, bonusNumber) => {
    this.LottoForm.checkLottoNumber(winningNumbers, bonusNumber);
    this.ResultModal.show();
    this.model.setResult(winningNumbers, bonusNumber);
    this.model.setProfit();
    this.model.setProfitMessage(this.ResultModal.$profitMessage);
    console.log(this.model.data.result);
    this.ResultModal.updateModal(this.model.data.result);
  };

  onClickBlackout = (event, $resultModal) => {
    if (event.target === $resultModal
      && $resultModal.classList.contains('open')) this.ResultModal.hide();
  };
}

