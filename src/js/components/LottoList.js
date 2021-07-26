import { KEY } from "../constants.js";
import { $, createEl } from "../util.js";

const LottoList = ({ useEffect }) => {
  const self = {
    element: createEl.div(),
  };

  const printLotto = (lotto) => {
    const element =
      "<div class='d-flex items-center w-100'>" +
      '<span class="mx-1 text-4xl">🎟️ </span>' +
      lotto.map((num) => `<span>${num}, </span>`).join("") +
      "</div>";

    return element;
  };

  const setHandler = (get, set) => {
    const checkbox = $.get("#showNumberCheckbox");
    checkbox.checked = get(KEY.SHOWING_NUMBER);
    checkbox.addEventListener("click", () =>
      set({ [KEY.SHOWING_NUMBER]: !get(KEY.SHOWING_NUMBER) })
    );
  };

  useEffect(
    (get, set) => {
      self.element.innerHTML = `<section class="mt-9">
    <div class="d-flex">
      <label class="flex-auto my-0">총 ${
        get(KEY.LOTTO_LIST).length
      }개를 구매하였습니다.</label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input type="checkbox" id='showNumberCheckbox' class="lotto-numbers-toggle-button" />
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
    <div class="d-flex flex-wrap">
    ${get(KEY.LOTTO_LIST)
      .map((lotto) =>
        get(KEY.SHOWING_NUMBER)
          ? printLotto(lotto)
          : '<span class="mx-1 text-4xl">🎟️ </span>'
      )
      .join("")}
    </div>
  </section>`;

      setHandler(get, set);
    },
    [KEY.LOTTO_LIST, KEY.SHOWING_NUMBER]
  );

  return self.element;
};

export default LottoList;
