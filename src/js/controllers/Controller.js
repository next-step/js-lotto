import lottoModel from "../models/Model.js";
import PurchaseAmountFormView from "../views/PurchaseAmountFormView.js";
import ManualLottoFormView from "../views/ManualLottoFormView.js";
import PurchasedLottoView from "../views/PurchasedLottoView.js";
import WinningNumberFormView from "../views/WinningNumberFormView.js";
import ResultModalView from "../views/ResultModalView.js";
import { selector } from "../utils/common.js";

export default class Controller {
  tag = "Controller";
  constructor() {
    PurchaseAmountFormView
      .init(selector("#PurchaseAmountForm"))
      .on("submit.updateAmount", this.onUpdateAmount)
      .bindEvent();
    
    ManualLottoFormView
      .init(selector("#ManualLottoForm"))
      .on("submit.updateManualLottoTicket", this.onUpdateManualLottos)
      .bindEvent();
    
    PurchasedLottoView
      .init(selector("#PurchasedLottoList"))
      .bindEvent();
    
    WinningNumberFormView
      .init(selector("#WinningNumberForm"))
      .on("submit.updateWinningNumbers", this.onUpdateWinningNumbers)
      .bindEvent();
    
    ResultModalView
      .init(selector(".modal"))
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
      lottoModel.setlottoTicketsAuto(lottoModel.purchaseAmount);
      ManualLottoFormView.hide();
      this.renderPurchasedLottoTickets();
    }
  }

  onUpdateManualLottos = ({ detail: { totalManualItems } }) => {
    lottoModel.setlottoTicketsManual(totalManualItems);
    this.renderPurchasedLottoTickets();
  }

  onUpdateWinningNumbers = ({detail: { winningNumbers }}) => {
    if (lottoModel.winningNumbers.join("") !== winningNumbers.join("")) {
      lottoModel.winningNumbers = winningNumbers;
      ResultModalView.render(lottoModel.getLottoResults());
    }
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
