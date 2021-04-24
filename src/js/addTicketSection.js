import { $, $$ } from "./dom.js";
import { BALL, FUNC, TEMPLATE, $topDiv } from "./constant.js";

export let lottoTickets = [];

export const resetLottoTicket = () => {
  lottoTickets = [];
};

export const addTicketSection = (amount, reset) => {
  if ($(".lotto-section") == null)
    $topDiv.insertAdjacentHTML("beforeend", TEMPLATE.TICKET_SEC);
  let $lotto_section = $(".lotto-section");
  if (reset) {
    $lotto_section.removeChild($("#amount-display"));
    $lotto_section.removeChild($("#ticket-display"));
    resetLottoTicket();
  }
  addTicketInnerTemplate($lotto_section, amount);
};

const addTicketInnerTemplate = ($lotto_section, amount) => {
  let ticketDOMs = "";
  for (let i = 0; i < amount / 1000; i++) {
    ticketDOMs += makeLOTTO();
  }
  const inner_template = TEMPLATE.TICKET_INNER(amount, ticketDOMs);
  $lotto_section.insertAdjacentHTML("beforeend", inner_template);
  addTicketDisplaySwitch();
};

const makeLOTTO = () => {
  let ary = [];
  for (let i = 0; i < 6; i++) {
    let num;
    do {
      num = FUNC.getRandomVal(BALL.MIN, BALL.MAX);
    } while (ary.includes(num));
    ary.push(num);
  }
  ary.sort((a, b) => {
    return a - b;
  });
  lottoTickets.push({ numbers: ary });

  return TEMPLATE.TICKET_DIV(ary.join(", "));
};

const addTicketDisplaySwitch = () => {
  $("label.switch>input").addEventListener("click", () => {
    $("#ticket-display").classList.toggle("flex-col");
    const $tickets = $$(".lotto-detail");
    $tickets.forEach((x) => {
      if (x.style.display == "none") {
        x.style.display = "inline";
      } else {
        x.style.display = "none";
      }
    });
  });
};
