import Component from "../lib/Component.js";
import PurchaseForm from "./PurchaseForm.js";
import Tickets from "./Tickets.js";
import Win from "./Win.js";
import Modal from "./Modal.js";

export default class App extends Component {
  setup() {
    this.state = {
      lottoNumbers: []
    }
    this.lottoChangeHandler = this.lottoChangeHandler.bind(this);
  }
  template() {
    return `
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <section id="PurchaseForm"></section>
          <section id="Tickets"></section>
          <section id="Win"></section>
        </div>
      </div>
      <section id="Modal"></section>
    `
  }
  mounted() {
    new PurchaseForm('#PurchaseForm', {lottoChangeHandler: this.lottoChangeHandler});
    new Tickets('#Tickets', {lottoNumbers: this.state.lottoNumbers});
    new Win('#Win');
    new Modal('#Modal');
  }
  lottoChangeHandler(lottoNumbers) {
    this.setState({lottoNumbers});
  }

}
