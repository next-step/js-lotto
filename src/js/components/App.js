import Component from '../core/Component.js';
import Header from './Header.js';
import PurchasePrice from './PurchasePrice.js';
import PurchaseTickets from './PurchaseTickets.js';
import WinningNumber from './WinningNumber.js';
import {
  UNIT_OF_PRICE,
  LOTTO_COUNT,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
} from '../utils/constant.js';

export default class App extends Component {
  constructor($target, state) {
    super($target, state);
    this.header = new Header(this.$target, this.state);
    this.purchasePrice = new PurchasePrice(
      this.$target.querySelector('#target'),
      this.state,
      this.issueTicket.bind(this),
    );
    this.purchaseTickets = new PurchaseTickets(
      this.$target.querySelector('#target'),
      this.state,
      this.toggleShowNumbers.bind(this),
    );
    this.winningNumber = new WinningNumber(
      this.$target.querySelector('#target'),
      this.state,
    );
  }

  setState(newState) {
    this.state = newState;
    this.purchaseTickets.setState(this.state);
    this.winningNumber.setState(this.state);
  }

  getTicketCount(purchasePrice) {
    return purchasePrice / UNIT_OF_PRICE;
  }

  getRandomNumbers() {
    const set = new Set();
    while (set.size < LOTTO_COUNT) {
      const value = Math.floor(
        Math.random() * (LOTTO_MAX_NUMBER - LOTTO_MIN_NUMBER + 1) +
          LOTTO_MIN_NUMBER,
      );
      set.add(value);
    }
    return Array.from(set);
  }

  getLottoNumbers(ticketAmount) {
    return new Array(ticketAmount).fill('').map(() => this.getRandomNumbers());
  }

  issueTicket(purchasePrice) {
    const ticketCount = this.getTicketCount(purchasePrice);
    const tickets = this.getLottoNumbers(ticketCount);
    this.setState({ ...this.state, purchasePrice, ticketCount, tickets });
  }

  toggleShowNumbers() {
    this.setState({
      ...this.state,
      isNumberVisible: !this.state.isNumberVisible,
    });
  }
}
