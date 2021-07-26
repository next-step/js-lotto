import { KEY } from "../constants.js";
import { $, createEl, createLottoList } from "../util.js";

const MoneyInput = ({ useEffect, getState, setState }) => {
  const self = {
    element: createEl.div(),
    $input: null,
    $form: null,
  };

  const init = () => {
    self.element.innerHTML = `<h1 class="text-center">🎱 행운의 로또</h1>
    <form class="mt-5" id="moneyForm">
      <label class="mb-2 d-inline-block"
        >구입할 금액을 입력해주세요.
      </label>
      <div class="d-flex">
        <input
          id="moneyInput"
          type="number"
          min="1000"
          max="100000"
          class="w-100 mr-2 pl-2"
          placeholder="구입 금액"
        />
        <button type='submit' class="btn btn-cyan">확인</button>
      </div>
    </form>`;

    self.$input = $.get("#moneyInput", self.element);
    self.$form = $.get("#moneyForm", self.element);
  };

  const setHandler = () => {
    self.$input.addEventListener("change", (e) =>
      setState({ [KEY.MONEY]: +e.target.value })
    );

    self.$input.addEventListener("invalid", (e) => {
      const { validity } = e.target;
      if (validity.rangeUnderflow) {
        e.target.setCustomValidity("값은 1000 이상이어야 합니다.");
      }
      if (validity.rangeOverflow) {
        e.target.setCustomValidity("값은 100000 이하여야 합니다.");
      }
      e.target.setCustomValidity("");
    });

    self.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      setState({
        [KEY.LOTTO_LIST]: createLottoList(
          Math.floor(getState(KEY.MONEY) / 1000)
        ),
      });
    });
  };

  useEffect(
    (get) => {
      self.$input.value = get(KEY.MONEY);
    },
    [KEY.MONEY]
  );

  init();
  setHandler();
  return self.element;
};

export default MoneyInput;
