import { $, $$ } from "./utils.js";
import { $modal, $lottoNumbersToggleButton, $paymentCost, $paymentForm, $paymentTickets } from "./DOM.js";
import { ALERT_ONE_THOUSAND_UNIT, MAX_IN_NUMBER, MIN_IN_NUMBER, PURCHASE_AMOUNT_UNIT } from "./constants.js";

class Lotto {
  constructor() {
    this.paymentCostStr = "";
  }

  setEvent() {
    $paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handlePayment();
    });
    $lottoNumbersToggleButton.addEventListener("click", (e) => {
      this.clickLottoNumberToggleButton();
    });
  }

  handlePayment() {
    this.paymentCostStr = $paymentCost.value;
    if (this.validatePaymentInput() === true) {
      this.validatePaymentInput();
      this.renderPurchaseTicketNumber();
      this.renderLottoNumber(this.makeTicket());
    }
    this.paymentCostStr = 0;
  }

  validatePaymentInput() {
    if (this.paymentCostStr % PURCHASE_AMOUNT_UNIT !== 0) {
      alert(ALERT_ONE_THOUSAND_UNIT);
      $paymentCost.value = "";
      return false;
    }
    $paymentCost.focus();
    return true;
  }

  renderPurchaseTicketNumber() {
    const number = this.lotteryIssuanceNumber();
    $paymentTickets.innerText = `총 ${number}개를 구매하였습니다.`;
  }

  renderLottoNumber(ticket) {
    const lottoResult = $(".lotto-result");

    while (lottoResult.hasChildNodes()) {
      lottoResult.removeChild(lottoResult.firstChild);
    }
    for (let i = 0; i < ticket.length; i++) {
      const li = document.createElement("li");
      li.className = "d-flex flex-wrap lotto-wrap";

      const img = document.createElement("span");
      img.className = "mx-1 text-4xl lotto-result-list-item";
      img.innerText = "🎟️";

      const ticketNumber = document.createElement("span");
      ticketNumber.classList = "lotto-ticket-number";
      ticketNumber.style = "display: none";
      ticketNumber.innerText = ticket[i];

      lottoResult.appendChild(li);
      li.appendChild(img);
      li.appendChild(ticketNumber);
    }

    return lottoResult;
  }

  onModalShow = () => {
    $modal.classList.add("open");
  };

  onModalClose = () => {
    $modal.classList.remove("open");
  };

  handleLottoNumbersToggleButton() {
    const toggleSwitch = $(".lotto-numbers-toggle-button");
    const ul = $$(".lotto-result");
    const ticketNumber = $$(".lotto-ticket-number");

    if (toggleSwitch.checked === true) {
      ul.forEach((ele) => {
        ele.className = "d-flex flex-wrap flex-col lotto-result";
      });
      ticketNumber.forEach((ele) => {
        ele.style.display = "inline";
      });
    } else {
      ul.forEach((ele) => {
        ele.className = "d-flex flex-wrap lotto-result";
      });
      ticketNumber.forEach((ele) => {
        ele.style.display = "none";
      });
    }
  }

  makeTicket() {
    const ticketAmount = this.lotteryIssuanceNumber();
    return Array(ticketAmount).fill(null).map(this.makeRandomLottoNumber);
  }

  lotteryIssuanceNumber() {
    return this.paymentCostStr / PURCHASE_AMOUNT_UNIT;
  }

  makeRandomLottoNumber() {
    let lottoNumber = [];
    let i = 0;

    while (i < 6) {
      const randomNumber = Math.floor(Math.random() * MAX_IN_NUMBER + MIN_IN_NUMBER);

      if (!isDuplicated(randomNumber)) {
        lottoNumber.push(randomNumber);
        i++;
      }
    }
    function isDuplicated(number) {
      for (let i = 0; i < 6; i++) {
        if (number === lottoNumber[i]) {
          return true;
        }
      }
      return false;
    }
    return lottoNumber;
  }
}

export default Lotto;
