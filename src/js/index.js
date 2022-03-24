import { getLottoListTemplate, getCount, createLottoList } from './domains/index.js';
import { getSelector } from './utils/index.js';
import { validatePrice, errorPrintAlert } from './domains/errors.js';

const initState = {
  price: 0,
  count: 0,
  lottoList: [],
  isShowLottoList: false,
};

function App() {
  const $formPrice = getSelector('#form-price');
  const $lottoToggleBtn = getSelector('.lotto-numbers-toggle-button');
  const $countLabel = getSelector('label[data-lotto="count-label"]');
  const $lottoList = getSelector('#lotto-list');
  const $lottoListUl = getSelector('#lotto-list ul');

  this.init = () => {
    this.state = { ...initState };
    initEventListener();
  };

  const setState = (newState) => {
    this.state = { ...this.state, ...newState };
  };

  const renderLottoList = () => {
    $countLabel.textContent = `총 ${this.state.count}개를 구매하였습니다.`;
    $lottoListUl.innerHTML = getLottoListTemplate(this.state.lottoList);
  };

  const renderLottoNumberToggle = () => {
    if (!this.state.isShowLottoList) {
      $lottoListUl.classList.remove('flex-col');
      $lottoList.classList.remove('lotto-detail-view');
      return;
    }

    $lottoList.classList.add('lotto-detail-view');
  };

  const handleSubmitPrice = (e) => {
    e.preventDefault();
    const price = e.target['price'].valueAsNumber;
    const { errorMsg } = validatePrice(price);
    if (errorMsg) {
      errorPrintAlert(errorMsg);
      return;
    }

    buyLotto(price);
  };

  const buyLotto = (price) => {
    const count = getCount(price);
    const lottoList = createLottoList(count);
    $lottoList.style.display = 'block';

    setState({ price, count, lottoList });
    renderLottoList();
  };

  const handleClickLottoNumbersToggle = () => {
    setState({ isShowLottoList: !this.state.isShowLottoList });
    renderLottoNumberToggle();
  };

  const initEventListener = () => {
    $formPrice.addEventListener('submit', handleSubmitPrice);
    $lottoToggleBtn.addEventListener('click', handleClickLottoNumbersToggle);
  };
}

const app = new App();
app.init();
