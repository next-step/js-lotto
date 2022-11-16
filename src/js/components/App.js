import Component from '../core/Component.js';
import Header from './Header.js';
import PurchasePrice from './PurchasePrice.js';
import PurchaseTicket from './PurchaseTicket.js';

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

  setState(nextState) {
    this.state = nextState;
    this.purchaseTicket.setState(this.state);
    console.log(this.state);
  }

  issueTicket(ticket) {
    this.setState({ ...this.state, ticket });
  }
}
