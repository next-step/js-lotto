import { getPrice, getCount, createLottoList } from './domains/index.js';
import { getSelector } from './utils/index.js';

// [x] 첫화면 렌더링 시에, 로또리스트, 당첨번호 form 비노출

// 로또 금액 입력이 잘못된 경우에 따른 경고창 노출
// [x] 로또 금액 입력 없이 확인 버튼 클릭할 때 경고창 노출
// [x] 로또 금액을 1,000원 이하로 구매하는 경우 경고창 노출
// [x] 로또 금액을 100,000원 초과로 구매하는 경우 경고창 노출
// [x] 로또 금액단위가 맞지않는 경우 경고창 노출

// 로또 금액이 정상적으로 입력된 경우
// [x] 로또 구매 성공시 로또 수량 및 로또 아이콘 표시

// 로또 구매 이후 번호보기 토글버튼 클릭한 경우
// [x] 6개의 로또번호 숫자가 중복되지 않는지 확인

// [x] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
// [x] 로또 1장의 가격은 1,000원이다.
// [x] 소비자는 자동 구매를 할 수 있어야 한다.
// [x] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

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
    $lottoListUl.textContent = '';

    this.state.lottoList.forEach((lotto) => {
      $lottoListUl.insertAdjacentHTML(
        'afterbegin',
        `
          <li class="lotto-list-item d-flex items-center">
            <span class="mx-1 text-4xl">🎟️ </span>
            <span class="lotto-detail text-xl mx-3">${lotto.join(', ')}</span>
          </li>
        `
      );
    });
    renderLottoNumberToggle();
  };

  const renderLottoNumberToggle = () => {
    if (!this.state.isLottoNumberToggle) {
      $lottoListUl.classList.remove('flex-col');
      return;
    }

    const $LottoDetailNodeList = document.querySelectorAll('.lotto-detail');

    $lottoListUl.classList.add('flex-col');
    $LottoDetailNodeList.forEach((lottoDetail) => {
      lottoDetail.style.display = 'block';
    });
  };

  const handleSubmitPrice = (e) => {
    e.preventDefault();
    const $priceInput = e.target.querySelector('input');
    const price = getPrice(Number($priceInput.value));

    price && buyLotto(price);
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
