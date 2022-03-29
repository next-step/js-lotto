import { getSelector } from '../utils/index.js';
import { getLottoListTemplate, getCount, createLottoList } from '../domains/index.js';
import { validatePrice, errorPrintAlert } from '../domains/errors.js';
import App from '../app.js';

class LottoList extends App {
  constructor() {
    super();
    this.$formPrice = getSelector('#form-price');
    this.$countLabel = getSelector('label[data-lotto="count-label"]');
    this.$lottoList = getSelector('#lotto-list');
    this.$lottoListUl = getSelector('#lotto-list ul');
    this.$lottoWinningCheck = getSelector('#form-winning');
  }
  init() {
    this.$formPrice.addEventListener('submit', this.buyLotto.bind(this));
  }
  buyLotto(e) {
    e.preventDefault();
    const price = e.target['price'].valueAsNumber;
    const { errorMsg } = validatePrice(price);
    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }

    const count = getCount(price);
    const lottoList = createLottoList(count);
    this.$lottoList.style.display = 'block';
    this.$lottoWinningCheck.style.display = 'block';
    this.setState({ price, count, lottoList });
  }
  _render() {
    this.$countLabel.textContent = `총 ${this.state.count}개를 구매하였습니다.`;
    this.$lottoListUl.innerHTML = getLottoListTemplate(this.state.lottoList);
  }
}

export default LottoList;
