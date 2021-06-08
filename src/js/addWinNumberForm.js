import { $, $$ } from "./dom.js";
import { BALL, FUNC, MESSAGE, TEMPLATE, $topDiv } from "./constant.js";
import { countWinningTicket } from "./countWinningTicket.js";
import { onModalShow } from "./controlModal.js";

export const addWinNumberForm = () => {
  $topDiv.insertAdjacentHTML("beforeend", TEMPLATE.WINNUM_SEC);
  const $winning_inputs = $$(".winning-number");
  const $bonus_input = $(".bonus-number");
  const $showResultButton = $(".open-result-modal-button");

  for (let i = 0; i < 5; i++) {
    $winning_inputs[i].addEventListener("input", (e) => {
      if (e.target.value.length == 2) $winning_inputs[i + 1].focus();
    });
  }
  $winning_inputs[5].addEventListener("input", (e) => {
    if (e.target.value.length == 2) $bonus_input.focus();
  });

  $showResultButton.addEventListener("click", () =>
    getWinningNumbers($winning_inputs, $bonus_input)
  );
};

const getWinningNumbers = ($winningNode, $bonusNode) => {
  let win_nums = [];
  let bonus = parseInt($bonusNode.value);
  for (let i = 0; i < 6; i++) {
    let num = parseInt($winningNode[i].value);
    if (FUNC.checkRange(num, BALL.MIN, BALL.MAX)) win_nums.push(num);
  }
  if (win_nums.length == 6 && FUNC.checkRange(bonus, BALL.MIN, BALL.MAX)) {
    if (FUNC.checkDupElement([...win_nums, bonus])) {
      alert(MESSAGE.NUM_DUP);
      return;
    }
    countWinningTicket(win_nums, bonus);
    onModalShow();
  }
};
