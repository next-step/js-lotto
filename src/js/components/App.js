import Component from '../core/Component.js';
import Header from './Header.js';
import PurchasePrice from './PurchasePrice.js';
import PurchaseTicket from './PurchaseTicket.js';
import { UNIT_OF_PRICE } from '../utils/constant.js';

export default class App extends Component {
  constructor($target, state) {
    super($target, state);
    this.header = new Header(this.$target, this.state);
    this.purchasePrice = new PurchasePrice(
      this.$target.querySelector('#target'),
      this.state,
      this.issueTicket.bind(this),
    );
    this.purchaseTicket = new PurchaseTicket(
      this.$target.querySelector('#target'),
      this.state,
    );
  }

  setState(newState) {
    this.state = newState;
    this.purchaseTicket.setState(this.state);
    console.log(this.state);
  }

  getTicket(purchasePrice) {
    let ticket = 0;
    ticket = purchasePrice / UNIT_OF_PRICE;
    return ticket;
  }

  issueTicket(purchasePrice) {
    const price = Number(purchasePrice);
    const ticket = this.getTicket(price);
    this.setState({ ...this.state, purchasePrice: price, ticket });
  }
}
