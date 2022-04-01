import { getSelector } from '../utils/index.js';
import { getLottoListTemplate, getCount, createLottoList } from '../domains/index.js';
import { validatePrice, errorPrintAlert } from '../domains/errors.js';
import App from '../app.js';

class LottoList extends App {
  _init() {
    getSelector('#form-price').addEventListener('submit', this.buyLotto.bind(this));
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
    getSelector('#lotto-list').style.display = 'block';
    getSelector('#form-winning').style.display = 'block';
    this.setState({ price, count, lottoList });
  }
  render() {
    getSelector('label[data-lotto="count-label"]').textContent = `총 ${this.state.count}개를 구매하였습니다.`;
    getSelector('#lotto-list ul').innerHTML = getLottoListTemplate(this.state.lottoList);
  }
}

export default LottoList;
