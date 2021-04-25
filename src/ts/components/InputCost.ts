import { AlertMsg, ClassName } from "../common/constants";
import { $, class2Query } from "../common/dom";
import { isValidCost } from "../common/validator";
import Component from "../core/Component";

const defaultState: InputCostState = {
  minCost: 1000,
  maxCost: 100000,
};

export default class InputCost extends Component<
  InputCostProps,
  InputCostState
> {
  constructor(
    $target: HTMLElement,
    props: InputCostProps,
    state: InputCostState = defaultState
  ) {
    super($target, props, state);
  }

  componentInit() {
    this.bindEvents();
  }

  bindEvents() {
    const onSubmit = (e: Event) => {
      e.preventDefault();

      const $input = $(
        class2Query(ClassName.input),
        this.$target
      ) as HTMLInputElement;

      const cost: number = +$input.value;
      if (!isValidCost(cost)) {
        alert(AlertMsg.InvalidCost);
        return;
      }
      this.setState({ cost });
      this.props?.submitCost(cost);
    };

    this.$target.addEventListener("submit", onSubmit);
  }

  setState(nextState: InputCostState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  getInnerHTML() {
    return `
          <label class="mb-2 d-inline-block">
            구입할 금액을 입력해주세요.
          </label>
          <div class="d-flex">
            <input
              type="number"
              class="w-100 mr-2 pl-2 ${ClassName.input}"
              placeholder="구입 금액"
              required
              min="${this.state!.minCost}" max="${this.state!.maxCost}"
              ${this.state?.cost ? `value=${this.state.cost}` : ""}
            />
            <button type="submit" class="btn btn-cyan">확인</button>
          </div>
    `;
  }
}

interface InputCostProps {
  submitCost(cost: number): void;
}

interface InputCostState {
  cost?: number;
  minCost?: number;
  maxCost?: number;
}
