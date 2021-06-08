import { ClassName } from "../common/constants";
import { $$, class2Query } from "../common/dom";
import { Lotto } from "../common/interfaces";
import Component from "../core/Component";

const defaultState: PurchaseInfoState = {
  lottos: [],
  canShow: false,
};

export default class PurchaseInfo extends Component<
  PurchaseInfoProps,
  PurchaseInfoState
> {
  constructor($target: HTMLElement) {
    super($target, {}, defaultState);
  }

  reset() {
    this.setState(defaultState);
  }

  componentInit() {
    this.bindEvents();
  }

  bindEvents() {
    const onChange = (e: Event) => {
      const $eventTarget = e.target as HTMLElement;
      if ($eventTarget.matches(class2Query(ClassName.lottoNumbersToggle))) {
        this.onChangeToggle($eventTarget as HTMLInputElement);
      }
    };
    this.$target.addEventListener("change", onChange);
  }

  onChangeToggle($toggle: HTMLInputElement) {
    $$(class2Query(ClassName.lottoDetail), this.$target).forEach(
      ($lottoDetail) => {
        if ($toggle.checked) {
          $lottoDetail.classList.remove(ClassName.displayNone);
        } else {
          $lottoDetail.classList.add(ClassName.displayNone);
        }
      }
    );
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
    if (!this.state?.canShow) {
      return ``;
    }

    const lottosHTML = this.state!.lottos!.map(
      (lotto) => `
          <li class="mx-1 text-4xl d-flex ${ClassName.lottoItem}">
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
            <label class="${ClassName.switch}">
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
  canShow?: boolean;
}
