import { Id, LottoConfig } from "../common/constants";
import { $, id2Query } from "../common/dom";
import { Lotto, WinningLotto } from "../common/interfaces";
import { getRandomLottoNumbers } from "../common/utils";
import Component from "../core/Component";
import InputCost from "./InputCost";
import InputLotto from "./InputLotto";
import PurchaseInfo from "./PurchaseInfo";
import ResultPopup from "./ResultPopup";

export default class App extends Component {
  private inputCostComp?: InputCost;
  private purchaseInfoComp?: PurchaseInfo;
  private inputLottoComp?: InputLotto;
  private resultPopupComp?: ResultPopup;
  constructor($target: HTMLElement) {
    super($target);
  }

  restart() {
    this.inputCostComp?.reset();
    this.purchaseInfoComp?.reset();
    this.inputLottoComp?.reset();
    this.resultPopupComp?.reset();
  }

  submitCost(cost: number) {
    const lottos = Array.from(Array(cost / LottoConfig.Price), () => ({
      numbers: getRandomLottoNumbers(),
    }));

    this.purchaseInfoComp?.setState({ canShow: true, lottos });
    this.inputLottoComp?.setState({ canShow: true });
  }

  submitLotto(winningLotto: WinningLotto) {
    const lottos: Lotto[] = this.purchaseInfoComp!.getLottos();
    this.resultPopupComp?.setState({ winningLotto, lottos });
    this.resultPopupComp?.show();
  }

  componentDidMount() {
    this.inputCostComp = new InputCost(
      $(id2Query(Id.inputCost), this.$target),
      { submitCost: (cost: number) => this.submitCost(cost) }
    );

    this.purchaseInfoComp = new PurchaseInfo(
      $(id2Query(Id.purchaseInfo), this.$target)
    );

    this.inputLottoComp = new InputLotto(
      $(id2Query(Id.inputLotto), this.$target),
      {
        submitLotto: (winningLotto: WinningLotto) =>
          this.submitLotto(winningLotto),
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
          <form id="${Id.inputCost}"class="mt-5"></form>
          <section id="${Id.purchaseInfo}" class="mt-9"></section>
          <form id="${Id.inputLotto}" class="mt-9"></form>
        </div>
        <div id="${Id.resultPopup}" class="modal"></div>
      </div>
    `;
  }
}
