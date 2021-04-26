import { AlertMsg, ClassName, LOTTO } from "../common/constants";
import { $, $$, class2Query } from "../common/dom";
import { hasDuplicateNumber } from "../common/utils";
import Component from "../core/Component";

export default class InputLotto extends Component<InputLottoProps> {
  constructor($target: HTMLElement, props: InputLottoProps) {
    super($target, props);
    this.bindEvents();
  }

  bindEvents() {
    const onSubmit = (e: Event) => {
      e.preventDefault();

      const winningNumbers = Array.from(
        $$(class2Query(ClassName.winningNumber), this.$target)
      ).map(($winningNum) => +($winningNum as HTMLInputElement).value);

      const $bonusNum = $(
        class2Query(ClassName.bonusNumber),
        this.$target
      ) as HTMLInputElement;

      const bonusNumber = +$bonusNum.value;

      if (hasDuplicateNumber([...winningNumbers, bonusNumber])) {
        window.alert(AlertMsg.DuplicateNumber);
        return;
      }
      this.props?.submitLotto(winningNumbers, bonusNumber);
    };

    this.$target.addEventListener("submit", onSubmit);
  }

  getInnerHTML() {
    const lottoInputHTML = Array(LOTTO.LEN)
      .fill(null)
      .map(
        (_, idx) => `
            <input
              type="number"
              class="${ClassName.winningNumber} mx-1 text-center"
              data-index-num="${idx}"
              required min="${LOTTO.MIN_NUM}" max="${LOTTO.MAX_NUM}"
            />
      `
      )
      .join("");
    return `
            <label class="flex-auto d-inline-block mb-3">
                지난 주 당첨번호 ${LOTTO.LEN}개와 보너스 넘버 1개를 입력해주세요.
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
                    data-index-num="${LOTTO.LEN}"
                    required min="${LOTTO.MIN_NUM}" max="${LOTTO.MAX_NUM}"
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
  submitLotto(winningNumbers: number[], bonusNumber: number): void;
}
