import { AlertMsg, ClassName, LottoConfig } from "../common/constants";
import { $, $$, class2Query } from "../common/dom";
import { WinningLotto } from "../common/interfaces";
import { hasDuplicateNumber } from "../common/utils";
import Component from "../core/Component";

const defaultState: InputLottoState = {
  canShow: false,
};
export default class InputLotto extends Component<
  InputLottoProps,
  InputLottoState
> {
  constructor($target: HTMLElement, props: InputLottoProps) {
    super($target, props, defaultState);
    this.bindEvents();
  }

  reset() {
    this.setState(defaultState);
  }

  setState(nextState: InputLottoState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  bindEvents() {
    const onSubmit = (e: Event) => {
      e.preventDefault();

      const winningNumbers = $$(
        class2Query(ClassName.winningNumber),
        this.$target
      ).map(($winningNum) => +($winningNum as HTMLInputElement).value);

      const $bonusNum = $(
        class2Query(ClassName.bonusNumber),
        this.$target
      ) as HTMLInputElement;

      const bonus = +$bonusNum.value;

      if (hasDuplicateNumber([...winningNumbers, bonus])) {
        window.alert(AlertMsg.DuplicateNumber);
        return;
      }
      this.props?.submitLotto({ numbers: winningNumbers, bonus });
    };

    this.$target.addEventListener("submit", onSubmit);
  }

  getInnerHTML() {
    if (!this.state?.canShow) {
      return ``;
    }

    const lottoInputHTML = Array(LottoConfig.LEN)
      .fill(null)
      .map(
        (_, idx) => `
            <input
              type="number"
              class="${ClassName.winningNumber} mx-1 text-center"
              data-index-num="${idx}"
              required min="${LottoConfig.MIN_NUM}" max="${LottoConfig.MAX_NUM}"
            />
      `
      )
      .join("");
    return `
            <label class="flex-auto d-inline-block mb-3">
                지난 주 당첨번호 ${LottoConfig.LEN}개와 보너스 넘버 1개를 입력해주세요.
            </label>
            <div class="d-flex">
              <div>
                <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                <div>
                  ${lottoInputHTML}
                </div>
              </div>
              <div class="bonus-number-container flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                  <input type="number" 
                    class="${ClassName.bonusNumber} text-center" 
                    data-index-num="${LottoConfig.LEN}"
                    required min="${LottoConfig.MIN_NUM}" max="${LottoConfig.MAX_NUM}"
                  />
                </div>
              </div>
            </div>
            <button 
                type="submit" 
                class="open-result-modal-button mt-5 btn btn-cyan w-100">
                결과 확인하기
            </button>
      `;
  }
}

interface InputLottoProps {
  submitLotto(winningLotto: WinningLotto): void;
}

interface InputLottoState {
  canShow: boolean;
}
