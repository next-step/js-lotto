import { Id } from "../common/constants";
import { $, id2Query } from "../common/dom";
import Component from "../core/Component";
import InputCost from "./InputCost";

export default class App extends Component {
  private inputCostComp?: InputCost;
  constructor($target: HTMLElement) {
    super($target);
  }

  submitCost(cost: number) {
    console.log(cost);
  }

  componentDidMount() {
    this.inputCostComp = new InputCost(
      $(id2Query(Id.inputCost), this.$target),
      { submitCost: (cost: number) => this.submitCost(cost) }
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
