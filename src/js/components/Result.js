import { KEY, INIT_STATE } from "../constants.js";
import { $, createEl, calcResult } from "../util.js";

const Result = ({ useEffect }) => {
  const element = createEl.div();

  useEffect(
    (get, set) => {
      if (!get(KEY.SHOWING_RESULT)) {
        return (element.innerHTML = null);
      }

      const result = get(KEY.RESULT);

      element.innerHTML = `<div class="modal">
  <div class="modal-inner p-10">
    <div class="modal-close">
      <svg viewbox="0 0 40 40">
        <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
      </svg>
    </div>

    <h2 class="text-center">🏆 당첨 통계 🏆</h2>
    
    <div class="d-flex justify-center mt-5">
      <button type="button" id="resetButton" class="btn btn-cyan">다시 시작하기</button>
    </div>
  </div>
</div>`;

      const $close = $.get(".modal-close");
      $close.addEventListener("click", () =>
        set({ [KEY.SHOWING_RESULT]: false })
      );

      const $reset = $.get("#resetButton");
      $reset.addEventListener("click", () => {
        set(INIT_STATE);
      });
    },
    [KEY.RESULT, KEY.SHOWING_RESULT]
  );

  return element;
};

export default Result;
