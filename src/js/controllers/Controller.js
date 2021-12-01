import lottoModel from "../models/Model.js";
import PurchaseAmountFormView from "../views/PurchaseAmountFormView.js";
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
    
    PurchasedLottoView
      .init(selector("#PurchasedLottoList"))
      .bindEvent();
    
    WinningNumberFormView
      .init(selector("#WinningNumberForm"))
      .on("submit.updateWinnings", this.onUpdateWinnings)
      .bindEvent();
    
    ResultModalView
      .init(selector(".modal"))
      .on("restart", this.onRestart)
      .bindEvent();
  }

  onUpdateAmount = ({detail: { price }}) => {
    lottoModel.purchaseAmount = price;

    PurchasedLottoView.render({
      amount: lottoModel.purchaseAmount,
      lottoTickets: lottoModel.lottoTickets
    });

    PurchasedLottoView.show();

    WinningNumberFormView.show();
  }

  onUpdateWinnings = ({detail: { winnings }}) => {
    if (lottoModel.winnings.join("") !== winnings.join("")) {
      lottoModel.winnings = winnings;
      ResultModalView.render(lottoModel.getLottoResults());
    }
    ResultModalView.show();
  }

  onRestart = () => {
    lottoModel.init();

    PurchaseAmountFormView.initValue();
    PurchasedLottoView.hide();

    WinningNumberFormView
      .initValue()
      .hide();
    
    ResultModalView.hide();
  }
}
