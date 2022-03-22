import { getLottoListTemplate, isValidPrice, getCount, createLottoList } from './domains/index.js';
import { getSelector } from './utils/index.js';

const initState = {
  price: 0,
  count: 0,
  lottoList: [],
  isLottoNumberToggle: false,
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
    render();
  };

  const render = () => {
    $countLabel.textContent = `총 ${this.state.count}개를 구매하였습니다.`;
    $lottoListUl.innerHTML = getLottoListTemplate(this.state.lottoList);

    renderLottoNumberToggle();
  };

  const renderLottoNumberToggle = () => {
    if (!this.state.isLottoNumberToggle) {
      $lottoListUl.classList.remove('flex-col');
      $lottoList.classList.remove('lotto-detail-view');
      return;
    }

    $lottoList.classList.add('lotto-detail-view');
  };

  const handleSubmitPrice = (e) => {
    e.preventDefault();
    const price = e.target['price'].valueAsNumber;
    if (!isValidPrice(price)) return;

    buyLotto(price);
  };

  const buyLotto = (price) => {
    const count = getCount(price);
    const lottoList = createLottoList(count);
    $lottoList.style.display = 'block';

    setState({ price, count, lottoList });
  };

  const handleClickLottoNumbersToggle = () => {
    setState({ isLottoNumberToggle: !this.state.isLottoNumberToggle });
  };

  const initEventListener = () => {
    $formPrice.addEventListener('submit', handleSubmitPrice);
    $lottoToggleBtn.addEventListener('click', handleClickLottoNumbersToggle);
  };
}

const app = new App();
app.init();
