import LottoForm from "./components/LottoForm.js";
import PurchasedResult from "./components/PurchasedResult.js";
import LottoNumbersPanel from "./components/LottoNumbersPanel.js";
import Modal from "./components/Modal.js";

export default class App {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  template() {
    return `
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <section id="LottoForm"></section>
          <section id="PurchasedResult"></section>
          <section id="LottoNumbersPanel"></section>
        </div>
      </div>
      <div id="Modal"></div>
    `;
  }

  mounted() {
    this._LottoForm = new LottoForm(document.querySelector("#LottoForm"));
    this._PurchasedResult = new PurchasedResult(document.querySelector("#PurchasedResult"));
    this._LottoNumbersPanel = new LottoNumbersPanel(document.querySelector("#LottoNumbersPanel"));
    this._Modal = new Modal(document.querySelector("#Modal"));
  }
}
