import { Id, LottoConfig } from "../common/constants";
import { $, id2Query } from "../common/dom";
import { Lotto, WinningLotto } from "../common/interfaces";
import Component from "../core/Component";
import InputCost from "./InputCost";
import InputLotto from "./InputLotto";
import InputManualLotto from "./InputManualLotto";
import PurchaseInfo from "./PurchaseInfo";
import ResultPopup from "./ResultPopup";

export default class App extends Component {
  private inputCostComp?: InputCost;
  private inputManualLottoComp?: InputManualLotto;
  private purchaseInfoComp?: PurchaseInfo;
  private inputLottoComp?: InputLotto;
  private resultPopupComp?: ResultPopup;
  constructor($target: HTMLElement) {
    super($target);
  }

  restart() {
    this.inputCostComp?.reset();
    this.inputManualLottoComp?.reset();
    this.purchaseInfoComp?.reset();
    this.inputLottoComp?.reset();
    this.resultPopupComp?.reset();
  }

  submitCost(cost: number) {
    const leftSelectCnt = Math.floor(cost / LottoConfig.PRICE);
    this.inputManualLottoComp?.setState({ leftSelectCnt });
    this.inputManualLottoComp?.show();
  }

  submitUserLottoList(lottos: Lotto[]) {
    this.inputManualLottoComp?.hide();
    this.purchaseInfoComp?.setState({ canShow: true, lottos });
    this.inputLottoComp?.setState({ canShow: true });
  }

  submitWinningLotto(winningLotto: WinningLotto) {
    const lottos: Lotto[] = this.purchaseInfoComp!.getLottos();
    this.resultPopupComp?.setState({ winningLotto, lottos });
    this.resultPopupComp?.show();
  }

  componentDidMount() {
    this.inputCostComp = new InputCost(
      $(id2Query(Id.inputCost), this.$target),
      { submitCost: (cost: number) => this.submitCost(cost) }
    );

    this.inputManualLottoComp = new InputManualLotto(
      $(id2Query(Id.inputManualLotto), this.$target),
      {
        submitUserLottoList: (lottoList: Lotto[]) =>
          this.submitUserLottoList(lottoList),
      }
    );

    this.purchaseInfoComp = new PurchaseInfo(
      $(id2Query(Id.purchaseInfo), this.$target)
    );

    this.inputLottoComp = new InputLotto(
      $(id2Query(Id.inputLotto), this.$target),
      {
        submitWinningLotto: (winningLotto: WinningLotto) =>
          this.submitWinningLotto(winningLotto),
      }
    );

    this.resultPopupComp = new ResultPopup(
      $(id2Query(Id.resultPopup), this.$target),
      { restart: () => this.restart() }
    );
  }

  getInnerHTML() {
    return `
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <div id="${Id.inputManualLotto}" class="modal"></div>
          <form id="${Id.inputCost}"class="mt-5"></form>
          <section id="${Id.purchaseInfo}" class="mt-9"></section>
          <form id="${Id.inputLotto}" class="mt-9"></form>
        </div>
        <div id="${Id.resultPopup}" class="modal"></div>
      </div>
    `;
  }
}
