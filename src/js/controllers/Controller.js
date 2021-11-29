import lottoModel from "../models/Model.js";
import PurchaseAmountFormView from "../views/PurchaseAmountFormView.js";
import PurchasedLottoView from "../views/PurchasedLottoView.js";
import WinningNumberFormView from "../views/WinningNumberFormView.js";
import { selector } from "../utils/common.js";

export default class Controller {
  tag = "Controller";
  constructor() {
    // console.log(`[${this.tag}] constructor`);

    lottoModel.log();
    
    PurchaseAmountFormView
      .init(selector("#PurchaseAmountForm"))
      .on("submit.updateAmount", this.onUpdateAmount)
      .bindEvent();
    
    PurchasedLottoView
      .init(selector("#PurchasedLottoList"))
      .bindEvent();
    
    WinningNumberFormView.init(selector("#WinningNumberForm"))
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
}
