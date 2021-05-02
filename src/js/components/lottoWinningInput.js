import { $, $all, $next, WINNING_SELECTOR } from "../utils/dom.js";
import { LOTTO_SIZE } from "../domain/lottoMaker.js";

export default function LottoWinningInput(app) {
  const $input = $(WINNING_SELECTOR.FORM);
  const $button = $(WINNING_SELECTOR.BUTTON);

  const onKeyHandler = (event) => {
    if (event.target.value.length >= 2 && event.key !== "Backspace") {
      $next(event.target)
        ? $next(event.target).focus()
        : $(".bonus-number").focus();
    }
    if (event.key === "Enter") {
      event.preventDefault();
      $(".open-result-modal-button").click();
    }
  };

  const onClickHandler = () => {
    if (checkValid($input.elements)) return;
    const values = Array.from($input.elements)
      .filter((e) => e.value)
      .map((e) => e.value);
    if (checkOverlap(values)) return;
    app.makeWinning(values.reverse());
  };

  $input.addEventListener("keydown", onKeyHandler);
  $button.addEventListener("click", onClickHandler);
}

const checkValid = (elements) =>
  Array.from(elements).some((element) => !element.reportValidity());

const checkOverlap = (values) => {
  if (new Set(values).length !== LOTTO_SIZE) return false;
  alert("당첨번호는 중복될 수 없습니다.");
  return true;
};
