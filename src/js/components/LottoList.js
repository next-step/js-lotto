// 구매한 로또를 볼 수 있는 컴포넌트
// initialState 에 isVisible 요소 들어있음
import { $ } from "../utils/dom.js";
import { SELECTORS } from "../utils/constants.js";
import { lottoListView } from "../utils/templates.js";

function LottoList({ $target, initialState }) {
  this.$target = $target;
  this.$desc = $(SELECTORS.LOTTO_DESC, this.$target);
  this.$icons = $(SELECTORS.LOTTO_ICONS, this.$target);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    this.$desc.innerText = `총 ${this.state.lottoCount}개를 구입하셨습니다.`;
    if (this.state.isVisible) this.$icons.classList.add("flex-col");
    else this.$icons.classList.remove("flex-col");
    this.$icons.innerHTML = lottoListView(
      this.state.isVisible,
      this.state.lottoList
    );
  };
  this.render();
}

export default LottoList;
