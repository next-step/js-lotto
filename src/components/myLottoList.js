import { $, SELECTOR } from '../utils/selector.js';

export default function MyLottoList({ initState, onToggle }) {
  this.$purchasedLottos = $(SELECTOR.CLASS.PURCHASED_LOTTOS);
  this.$purchasedLottos.style.display = 'none';
  this.$totalPurchase = $(SELECTOR.CLASS.TOTAL_PURCHASED);
  this.$lottoNumbersToggleButton = $(SELECTOR.CLASS.LOTTO_NUMBERS_TOGGLE_BUTTON);
  this.$lottos = $(SELECTOR.CLASS.LOTTOS);

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { isPreviousPurchase, visiableLottoToggle, myLottos } = this.state;

    // 저 아래 innerHTML 처럼 확실한 리렌더링 개념이면 현재 함수에 위치할만 하다 생각한다.
    // 하지만 state 에 따라, 기타 스타일링이나 내부 텍스트 컨텐츠만 바뀌는 작업인데 이를 어떻게 처리해야할까.
    this.$purchasedLottos.style.display = isPreviousPurchase && 'block';
    this.$totalPurchase.textContent = myLottos.length;
    this.$lottoNumbersToggleButton.checked = visiableLottoToggle;
    if (visiableLottoToggle) {
      this.$lottos.classList.add('flex-col');
    }
    if (!visiableLottoToggle) {
      this.$lottos.classList.remove('flex-col');
    }

    // 아래 innerHTML 하는 부분은 render 한다는 느낌이 강하니깐 그렇다 치고..
    this.$lottos.innerHTML = myLottos
      ?.map(
        (lotto) =>
          `<li class="mx-1 text-4xl lotto-wrapper">
            <span data-test="lotto-icon" class="lotto-icon">🎟️</span>
            <span data-test="lotto-detail" class="lotto-detail" style="display: ${
              visiableLottoToggle ? 'inline;' : 'none;'
            }">
              ${lotto.join(', ')}
            </span>
          </li>`
      )
      .join('');
  };

  this.toggleLottoNumberButton = (event) => {
    const toggle = event.target.checked;
    onToggle(toggle);
  };

  this.$lottoNumbersToggleButton.addEventListener('click', this.toggleLottoNumberButton);
}
