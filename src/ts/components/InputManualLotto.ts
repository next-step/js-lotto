import { AlertMsg, ClassName, LottoConfig } from "../common/constants";
import { $$, class2Query } from "../common/dom";
import { Lotto } from "../common/interfaces";
import { getRandomLottoNumbers, hasDuplicateNumber } from "../common/utils";
import Component from "../core/Component";

const defaultState: InputManualLottoState = {
  lottos: [],
  leftSelectCnt: 0,
};
export default class InputManualLotto extends Component<
  InputManualLottoProps,
  InputManualLottoState
> {
  constructor($target: HTMLElement, props: InputManualLottoProps) {
    super($target, props, defaultState);
    this.bindEvents();
  }

  show() {
    this.$target.classList.add(ClassName.open);
  }

  hide() {
    this.$target.classList.remove(ClassName.open);
  }

  reset() {
    this.hide();
    this.setState(defaultState);
  }

  setState(nextState: InputManualLottoState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  bindEvents() {
    const onClickManualSelect = (e: SubmitEvent) => {
      e.preventDefault();

      const manualNumbers = $$(
        class2Query(ClassName.manualNumber),
        this.$target
      ).map(($manualNum) => +($manualNum as HTMLInputElement).value);

      if (hasDuplicateNumber([...manualNumbers])) {
        window.alert(AlertMsg.DuplicateNumber);
        return;
      }

      this.setState({
        lottos: [...this.state!.lottos!, { numbers: manualNumbers }],
        leftSelectCnt: this.state!.leftSelectCnt! - 1,
      });

      if (this.state!.leftSelectCnt === 0) {
        this.props?.submitUserLottoList(this.state!.lottos!);
      }
    };

    const onClickAutoSelect = (e: MouseEvent) => {
      const $eventTarget = e.target as HTMLElement;
      if (!$eventTarget.matches(class2Query(ClassName.autoSelectBtn))) {
        console.log("not clicked auto select btn");
        return;
      }

      const autoLottoList: Lotto[] = Array.from(
        Array(this.state!.leftSelectCnt),
        () => ({
          numbers: getRandomLottoNumbers(),
        })
      );

      this.props?.submitUserLottoList([
        ...this.state!.lottos!,
        ...autoLottoList,
      ]);
    };

    this.$target.addEventListener("submit", onClickManualSelect);
    this.$target.addEventListener("click", onClickAutoSelect);
  }

  getInnerHTML() {
    const manualLottoIconHTML = Array(this.state!.lottos!.length)
      .fill(null)
      .map((_) => `<span class="mx-1 text-4xl">🎟️ </span>`)
      .join("");

    const manualInputHTML = Array(LottoConfig.LEN)
      .fill(null)
      .map(
        (_, idx) => `
            <input
              type="number"
              class="${ClassName.manualNumber} mx-1 text-center"
              data-index-num="${idx}"
              required min="${LottoConfig.MIN_NUM}" max="${LottoConfig.MAX_NUM}"
            />
      `
      )
      .join("");

    return `
        <div class="${ClassName.modalInner} ${ClassName.manualLottoModalInner} p-5">
          <section class="mt-5 text-center">
            <h1>로또 수동 번호 선택</h1>
            <div class="mt-3">
              <div class="${ClassName.manualLottoBox} d-flex flex-wrap justify-center">
                ${manualLottoIconHTML}
              </div>
            </div>
            <div class="mt-3">
              <h2>수동 번호 선택 가능 수량</h2>
              <div><span id="issuable-ticket-amount">${this.state?.leftSelectCnt}</span> 장</div>
            </div>
            <div class="mt-5">
              <form class="${ClassName.manualLottoForm} p-2">
                <div class="text-center">
                  로또 번호를 직접 입력해주세요.
                </div>
                <div class="d-flex mt-4 justify-center items-center">
                  ${manualInputHTML}
                  <button type="submit" class="${ClassName.manualSelectBtn} btn btn-cyan ml-2">
                    발급
                  </button>
                </div>
              </form>
              <button class="${ClassName.autoSelectBtn} mt-5 btn btn-cyan w-100">나머지는 자동 번호 선택</button>
            </div>
          </section>
        </div>
      `;
  }
}

interface InputManualLottoProps {
  submitUserLottoList: (lottoList: Lotto[]) => void;
}

interface InputManualLottoState {
  lottos?: Lotto[];
  leftSelectCnt?: number;
}
