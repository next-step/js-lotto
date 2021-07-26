import { KEY } from "../constants.js";
import { $, createEl } from "../util.js";

const WinnerInput = ({ useEffect }) => {
  const element = createEl.div();

  useEffect(
    (get, set) => {
      element.innerHTML = `<form class="mt-9" id='winningForm'>
      <label class="flex-auto d-inline-block mb-3"
        >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
      >
      <div class="d-flex">
        <div>
          <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
          <div>
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
          </div>
        </div>
        <div class="bonus-number-container flex-grow">
          <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
          <div class="d-flex justify-center">
            <input type="number" class="winning-number text-center" />
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="open-result-modal-button mt-5 btn btn-cyan w-100"
      >
        결과 확인하기
      </button>
    </form>`;

      const $inputs = $.getAll(".winning-number", element);
      $inputs.forEach(($input) => {
        $input.setAttribute("min", "1");
        $input.setAttribute("max", "45");
        $input.required = true;

        $input.addEventListener("invalid", (e) => {
          const { validity } = e.target;
          if (validity.rangeUnderflow) {
            return e.target.setCustomValidity("값은 1 이상이어야 합니다.");
          }
          if (validity.rangeOverflow) {
            return e.target.setCustomValidity("값은 45 이하여야 합니다.");
          }
          return e.target.setCustomValidity("");
        });
      });

      const $form = $.get("#winningForm", element);
      $form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log($inputs);
        set({
          [KEY.WINNING_NUMBER]: [...$inputs].map(($input) => $input.value),
        });
      });
    },
    [KEY.LOTTO_LIST, KEY.WINNING_NUMBER, KEY.SHOWING_RESULT]
  );

  return element;
};

export default WinnerInput;
