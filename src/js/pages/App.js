import Component from "../lib/Component.js";
import PurchaseForm from "./PurchaseForm.js";
import Tickets from "./Tickets.js";
import Win from "./Win.js";
import Modal from "./Modal.js";
import ManualPurchaseModal from "./ManualPurchaseModal.js";
import {$, getLottoNumbers} from "../modules/utils.js";

export default class App extends Component {
  setup() {
    this.initialWinnings = {
      rankings: [
        {
          grade: 1,
          ammount: 2000000000,
          tickets: []
        },
        {
          grade: 2,
          ammount: 30000000,
          tickets: []
        },
        {
          grade: 3,
          ammount: 1500000,
          tickets: []
        },
        {
          grade: 4,
          ammount: 50000,
          tickets: []
        },
        {
          grade: 5,
          ammount: 5000,
          tickets: []
        }
      ],
      profitRate: 0
    };
    this.state = {
      money: 0,
      lottoNumbers: [],
      isModalVisible: false,
      isManualModalVisible: false,
      winnings: this.initialWinnings,
      winningNumbers: [],
      bonusNumber: 0
    }
    this.purchaseLotto = this.purchaseLotto.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showManualModal = this.showManualModal.bind(this);
    this.purchaseManual = this.purchaseManual.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeManualModal = this.closeManualModal.bind(this);
    this.reset = this.reset.bind(this);
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
      <section id="ManualPurchaseModal"></section>
    `
  }
  mounted() {
    const {money, lottoNumbers, isModalVisible, isManualModalVisible, winnings, winningNumbers, bonusNumber} = this.state;
    new PurchaseForm('#PurchaseForm', {
      money,
      purchaseLotto: this.purchaseLotto,
      showManualModal: this.showManualModal
    });
    new Tickets('#Tickets', {lottoNumbers});
    new Win('#Win', {showModal: this.showModal, winningNumbers, bonusNumber});
    new Modal('#Modal', {isModalVisible, winnings, reset: this.reset, closeModal: this.closeModal});
    new ManualPurchaseModal('#ManualPurchaseModal', {
      money,
      isManualModalVisible,
      closeManualModal: this.closeManualModal,
      purchaseManual: this.purchaseManual
    });
  }
  getLottoNumbers(money) {
    const lottoNumbers = [];
    const purchaseCount = Math.floor(money / 1000)
    for (let i = 0; i < purchaseCount; i++) {
      lottoNumbers[i] = getLottoNumbers();
    }
    return lottoNumbers;
  }
  purchaseLotto(purchaseMoney) {
    if(purchaseMoney < 1000) {
      alert('로또 구매에는 최소 1,000원 이상이 필요합니다');
      this.setState({money: ''});
      return;
    }
    if(purchaseMoney > 100000) {
      alert('한 번에 10만원어치 이상은 구매할 수 없습니다');
      this.setState({money: ''});
      return;
    }
    const purchaseLottoNumbers = this.getLottoNumbers(purchaseMoney);
    const lottoNumbers = this.state.lottoNumbers;
    lottoNumbers.push(...purchaseLottoNumbers);
    this.setState({lottoNumbers, money: this.state.money - purchaseMoney});
  }
  checkWinning(winningNumbers, bonusNumber, lottoNumbers) {
    const {winnings} = this.state;

    lottoNumbers.forEach(numbers => {
      let matchingCount = 0;

      numbers.forEach(number => {
        if(winningNumbers.includes(number)) {
          matchingCount++;
        }
      });

      if(matchingCount === 6) {
        winnings.rankings.find(ranking => ranking.grade === 1).tickets.push(numbers);
      } else if(matchingCount === 5 && numbers.includes(bonusNumber)) {
        winnings.rankings.find(ranking => ranking.grade === 2).tickets.push(numbers);
      } else if(matchingCount === 5) {
        winnings.rankings.find(ranking => ranking.grade === 3).tickets.push(numbers);
      } else if(matchingCount === 4) {
        winnings.rankings.find(ranking => ranking.grade === 4).tickets.push(numbers);
      } else if(matchingCount === 3) {
        winnings.rankings.find(ranking => ranking.grade === 5).tickets.push(numbers);
      }
    });

    const purchaseAmount = 1000 * lottoNumbers.length;
    const {rankings} = winnings;
    const totalWinningAmount = rankings.reduce((total, ranking) => {
      total += ranking.ammount * ranking.tickets.length;
      return total;
    }, 0);

    const profitRate = totalWinningAmount / purchaseAmount * 100 - 100 || 0;
    winnings.profitRate = profitRate;
    return winnings;
  }
  showModal(winningNumbers, bonusNumber) {
    const {lottoNumbers} = this.state;
    const winnings = this.checkWinning(winningNumbers, bonusNumber, lottoNumbers);
    this.setState({isModalVisible: true, winnings, winningNumbers, bonusNumber});
  }
  showManualModal(money) {
    this.setState({isManualModalVisible: true, money});
  }
  showModal(winningNumbers, bonusNumber) {
    const {lottoNumbers} = this.state;
    const winnings = this.checkWinning(winningNumbers, bonusNumber, lottoNumbers);
    this.setState({isModalVisible: true, winnings, winningNumbers, bonusNumber});
  }
  closeModal() {
    this.setState({isModalVisible: false});
  }
  closeManualModal() {
    this.setState({isManualModalVisible: false});
  }
  purchaseManual(inputNumbers) {
    const {lottoNumbers, money} = this.state;

    if(!inputNumbers.every(ele => !!ele)) {
      alert('모든 로또번호를 입력해야 합니다.');
      return;
    }
    if(!inputNumbers.every(ele => ele>=0 && ele<=45)) {
      alert('로또번호를 1~45 사이의 값만 입력해야 합니다.');
      return;
    }
    if(!money || Number.parseInt(money) < 1000) {
      alert('로또 구매에는 최소 1,000원 이상이 필요합니다');
      return;
    }

    lottoNumbers.push(inputNumbers);
    this.setState({
      lottoNumbers,
      money: Number.parseInt(money) - 1000
    });
  }
  reset() {
    this.setState({
      money: '',
      lottoNumbers: [],
      isModalVisible: false,
      winnings: this.initialWinnings,
      winningNumbers: [],
      bonusNumber: ''
    });
  }
}
