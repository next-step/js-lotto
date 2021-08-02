import createStore from "./store.js";
import { INIT_STATE, KEY } from "./constants.js";
import { $, printLotto, createLottoList, calcResult } from "./util.js";

const { getState, setState, subscribe } = createStore(INIT_STATE);

const $MoneyInput = $.get("#moneyInput");
const $MoneyForm = $.get("#moneyForm");

const $LottoSection = $.get("#lottoSection");
const $LottoListLengthLabel = $.get("#lottoListLengthLabel");
const $LottoWrap = $.get("#lottoWrap");
const $ShowNumberSwitch = $.get("#showNumberSwitch");

const $WinningNumberForm = $.get("#winningNumberForm");
const $WinningNumberInputs = $.getAll(".winning-number");

const $ResultModal = $.get("#resultModal");
const $ModalClose = $.get(".modal-close");
const $ResultContents = $.get("#resultContents");
const $ResetButton = $.get("#resetButton");

$MoneyInput.addEventListener("change", (e) =>
  setState({ [KEY.MONEY]: +e.target.value })
);

$MoneyInput.addEventListener("invalid", (e) => {
  const { validity } = e.target;
  if (validity.rangeUnderflow) {
    e.target.setCustomValidity("값은 1000 이상이어야 합니다.");
  }
  if (validity.rangeOverflow) {
    e.target.setCustomValidity("값은 100000 이하여야 합니다.");
  }
  e.target.setCustomValidity("");
});

$MoneyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  setState({
    [KEY.LOTTO_LIST]: createLottoList(Math.floor(getState(KEY.MONEY) / 1000)),
  });
});

$ShowNumberSwitch.checked = getState(KEY.SHOWING_NUMBER);
$ShowNumberSwitch.addEventListener("click", () => {
  const isShowing = getState(KEY.SHOWING_NUMBER);
  setState({ [KEY.SHOWING_NUMBER]: !isShowing });
});

$WinningNumberInputs.forEach(($WinningNumberInput) => {
  $WinningNumberInput.setAttribute("min", "1");
  $WinningNumberInput.setAttribute("max", "45");
  $WinningNumberInput.required = true;

  $WinningNumberInput.addEventListener("invalid", (e) => {
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

$WinningNumberForm.addEventListener("submit", (e) => {
  e.preventDefault();
  setState({
    [KEY.RESULT]: calcResult(
      getState(KEY.LOTTO_LIST),
      [...$WinningNumberInputs].map(($input) => $input.value)
    ),
    [KEY.SHOWING_RESULT]: true,
  });
});

$ModalClose.addEventListener("click", () =>
  setState({ [KEY.SHOWING_RESULT]: false })
);

$ResetButton.addEventListener("click", () => {
  setState(INIT_STATE);
  $.getAll("input").forEach(($input) => ($input.value = ""));
});

subscribe(
  (get) => {
    const lottoList = get(KEY.LOTTO_LIST);

    if (lottoList.length > 0) {
      $LottoSection.classList.remove("d-none");
      $LottoListLengthLabel.innerHTML = ` 총 ${lottoList.length}개를 구매하였습니다.`;
      $LottoWrap.innerHTML = get(KEY.LOTTO_LIST)
        .map((lotto) =>
          get(KEY.SHOWING_NUMBER)
            ? printLotto(lotto)
            : '<span class="mx-1 text-4xl">🎟️ </span>'
        )
        .join("");

      $WinningNumberForm.classList.remove("d-none");
    } else {
      $LottoSection.classList.add("d-none");
      $WinningNumberForm.classList.add("d-none");
    }
  },
  [KEY.LOTTO_LIST, KEY.SHOWING_NUMBER]
);

subscribe(
  (get) => {
    if (get(KEY.SHOWING_RESULT)) {
      $ResultModal.classList.remove("close");
      const result = get(KEY.RESULT);

      $ResultContents.innerHTML = `<h2 class="text-center">🏆 당첨 통계 🏆</h2>
  <div class="d-flex justify-center">
  <table class="result-table border-collapse border border-black">
    <thead>
      <tr class="text-center">
        <th class="p-3">일치 갯수</th>
        <th class="p-3">당첨금</th>
        <th class="p-3">당첨 갯수</th>
      </tr>
    </thead>
    <tbody>
      <tr class="text-center">
        <td class="p-3">3개</td>
        <td class="p-3">5,000</td>
        <td class="p-3">${result[3].value}개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">4개</td>
        <td class="p-3">50,000</td>
        <td class="p-3">${result[4].value}개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">5개</td>
        <td class="p-3">1,500,000</td>
        <td class="p-3">${result[5].value}개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">5개 + 보너스볼</td>
        <td class="p-3">30,000,000</td>
        <td class="p-3">${result[10].value}개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">6개</td>
        <td class="p-3">2,000,000,000</td>
        <td class="p-3">${result[6].value}개</td>
      </tr>
    </tbody>
  </table>
</div>
<p class="text-center font-bold">당신의 총 수익률은 ${
        ((Object.keys(result).reduce(
          (acc, key) => acc + result[key].value * result[key].reward,
          0
        ) -
          get(KEY.MONEY)) /
          get(KEY.MONEY)) *
        100
      }%입니다.</p>`;
    } else {
      $ResultModal.classList.add("close");
    }
  },
  [KEY.SHOWING_RESULT]
);
