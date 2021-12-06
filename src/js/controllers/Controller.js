import lottoModel from "../models/Model.js";
import PurchaseAmountFormView from "../views/PurchaseAmountFormView.js";
import ManualLottoFormView from "../views/ManualLottoFormView.js";
import PurchasedLottoView from "../views/PurchasedLottoView.js";
import WinningNumberFormView from "../views/WinningNumberFormView.js";
import ResultModalView from "../views/ResultModalView.js";
import { $ } from "../utils/common.js";

export default class Controller {
  tag = "Controller";
  constructor() {
    PurchaseAmountFormView
      .init($("#PurchaseAmountForm"))
      .on("submit.updateAmount", this.onUpdateAmount)
      .bindEvent();
    
    ManualLottoFormView
      .init($("#ManualLottoForm"))
      .on("submit.updateManualLottoTicket", this.onUpdateManualLottos)
      .bindEvent();
    
    PurchasedLottoView
      .init($("#PurchasedLottoList"))
      .bindEvent();
    
    WinningNumberFormView
      .init($("#WinningNumberForm"))
      .on("submit.updateWinningNumbers", this.onUpdateWinningNumbers)
      .bindEvent();
    
    ResultModalView
      .init($(".modal"))
      .on("restart", this.onRestart)
      .bindEvent();
  }

  renderPurchasedLottoTickets() {
    PurchasedLottoView
      .render({
        amount: lottoModel.purchaseAmount,
        lottoTickets: lottoModel.lottoTickets
      })
      .show();

    WinningNumberFormView.show();
  }

  renderManualLottoForm() {
    ManualLottoFormView
      .initValue()
      .render({
        amount: lottoModel.purchaseAmount
      })
      .show();
    
    PurchasedLottoView.hide();
    WinningNumberFormView.hide();
  }

  onUpdateAmount = ({detail: { price, selectedProcess }}) => {
    lottoModel.purchaseAmount = price;

    if (selectedProcess === "manual") {
      this.renderManualLottoForm();
    } else {
      lottoModel.setLottoTicketsAuto(lottoModel.purchaseAmount);
      ManualLottoFormView.hide();
      this.renderPurchasedLottoTickets();
    }
  }

  onUpdateManualLottos = ({ detail: { totalManualItems } }) => {
    lottoModel.setLottoTicketsManual(totalManualItems);
    this.renderPurchasedLottoTickets();
  }

  onUpdateWinningNumbers = ({detail: { winningNumbers }}) => {
    if (lottoModel.winningNumbers.join("") !== winningNumbers.join("")) {
      lottoModel.winningNumbers = winningNumbers;
    }
    
    ResultModalView.render(lottoModel.getLottoResults());
    ResultModalView.show();
  }

  onRestart = () => {
    lottoModel.init();

    PurchaseAmountFormView.initValue();
    ManualLottoFormView.initValue().hide();
    PurchasedLottoView.hide();

    WinningNumberFormView
      .initValue()
      .hide();
    
    ResultModalView.hide();
  }
}
