import { ClassName } from "../common/constants";
import { $$, class2Query } from "../common/dom";
import Component from "../core/Component";

const defaultState: PurchaseInfoState = {
  lottos: [],
};

export default class PurchaseInfo extends Component<
  PurchaseInfoProps,
  PurchaseInfoState
> {
  constructor($target: HTMLElement, props: PurchaseInfoProps) {
    super($target, props, defaultState);
  }

  componentInit() {
    this.bindEvents();
  }

  bindEvents() {
    const onChange = (e: Event) => {
      const $eventTarget = e.target as HTMLElement;
      if ($eventTarget.matches(class2Query(ClassName.lottoNumbersToggle))) {
        const $toggle = $eventTarget as HTMLInputElement;
        $$(class2Query(ClassName.lottoDetail)).forEach(($lottoDetail) => {
          if ($toggle.checked) {
            $lottoDetail.classList.remove(ClassName.displayNone);
          } else {
            $lottoDetail.classList.add(ClassName.displayNone);
          }
        });
      }
    };
    this.$target.addEventListener("change", onChange);
  }

  setState(nextState: PurchaseInfoState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  getLottos(): Lotto[] {
    const lottos = this.state?.lottos ?? [];
    return [...lottos];
  }

  getInnerHTML() {
    const lottosHTML = this.state!.lottos!.map(
      (lotto) => `
          <li class="mx-1 text-4xl d-flex"">
              <span>🎟️ </span>
              <span class="ml-2 font-xl
              ${ClassName.displayNone} 
              ${ClassName.lottoDetail}"
              >${lotto.numbers.join(", ")}</span>
          </li>
      `
    ).join("");

    return `
        <div class="d-flex">
          <label class="flex-auto my-0">
            총 ${this.state!.lottos!.length}개를 구매하였습니다.
          </label>
          <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
              <input type="checkbox" class="${ClassName.lottoNumbersToggle}"/>
              <span class="text-base font-normal">번호보기</span>
            </label>
          </div>
        </div>
        <ul class="d-flex flex-wrap">
            ${lottosHTML}
        </ul>
      `;
  }
}

interface PurchaseInfoProps {}

interface PurchaseInfoState {
  lottos?: Lotto[];
}

interface Lotto {
  numbers: number[];
}
