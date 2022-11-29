import { $, $$ } from "./utils.js";
import { $modal, $lottoNumbersToggleButton, $paymentCost, $paymentForm, $paymentTickets, $showModalButton, $removeModalButton, $$winningNumbers, $bonusNumber, $resetButton } from "./DOM.js";
import { ALERT_MESSAGE, MAX_IN_NUMBER, MIN_IN_NUMBER, PURCHASE_AMOUNT_UNIT } from "./constants.js";
import { isDuplicatedNumbers, validateRange } from "./validate.js";

class Lotto {
  constructor() {
    this.paymentCostStr = "";
    this.ticket = [];
    this.winningNumber = [];
    this.bonusNumber = 0;
  }

  setEvent() {
    $paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handlePayment();
    });
    $lottoNumbersToggleButton.addEventListener("click", (e) => {
      this.handleLottoNumbersToggleButton();
    });
    $showModalButton.addEventListener("click", () => {
      const result = this.matchResultNumber();
      this.onModalShow(result);
    });
    $removeModalButton.addEventListener("click", () => {
      this.onModalClose();
    });
    $resetButton.addEventListener("click", () => {
      this.resetButton();
    });
  }

  handlePayment() {
    this.paymentCostStr = $paymentCost.value;
    if (this.validatePaymentInput() === true) {
      this.validatePaymentInput();
      this.renderPurchaseTicketNumber();
      this.ticket = this.makeRandomNumberArray();
      this.renderLottoNumber(this.ticket);
    }
  }

  validatePaymentInput() {
    if (this.paymentCostStr === "") {
      alert(ALERT_MESSAGE.InputRequired);
      return false;
    }
    if (this.paymentCostStr % PURCHASE_AMOUNT_UNIT !== 0) {
      alert(ALERT_MESSAGE.IncorrectUnit);
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
  }

  matchResultNumber() {
    this.getWinningNumbers();
    return this.winningNumbersCount(this.ticket, this.winningNumber, this.bonusNumber);
  }

  getWinningNumbers() {
    const winningNumbers = Array.from($$winningNumbers).map((number) => +number.value);
    const bonusNumber = +$bonusNumber.value;
    const concatArray = winningNumbers.concat(bonusNumber);
    if (!validateRange(concatArray)) {
      return alert("1~45사이의 숫자를 입력해주세요.");
    }
    if (isDuplicatedNumbers(concatArray)) {
      return alert("중복되지 않는 숫자를 입력해주세요.");
    }
    this.winningNumber = winningNumbers;
    this.bonusNumber = bonusNumber;
  }
  // 로또 번호와 비교하여 같은 숫자가 있으면 카운트

  renderWinningCount(result) {
    const $threePoint = $("#three-point");
    const $fourPoint = $("#four-point");
    const $fivePoint = $("#five-point");
    const $fiveBonusPoint = $("#five-bonus-point");
    const $sixPoint = $("#six-point");

    $threePoint.innerText = `${result.three}개`;
    $fourPoint.innerText = `${result.four}개`;
    $fivePoint.innerText = `${result.five}개`;
    $fiveBonusPoint.innerText = `${result.five_bonus}개`;
    $sixPoint.innerText = `${result.six}개`;
    return result;
  }

  renderLottoProfit(winningCount) {
    const $lottoProfit = $("#lotto-profit");
    const countArray = Object.values(winningCount);

    let totalProfit = 0;
    if (countArray[0] > 0) totalProfit += 5000 * countArray[0];
    if (countArray[1] > 0) totalProfit += 50000 * countArray[1];
    if (countArray[2] > 0) totalProfit += 1500000 * countArray[2];
    if (countArray[3] > 0) totalProfit += 30000000 * countArray[3];
    if (countArray[4] > 0) totalProfit += 2000000000 * countArray[4];

    const profitRate = Math.floor(totalProfit / +this.paymentCostStr);
    return ($lottoProfit.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`);
  }

  winningNumbersCount(lottoNumbers, winningNumbers, bonusNumber) {
    const winningCount = {
      three: 0,
      four: 0,
      five: 0,
      five_bonus: 0,
      six: 0,
    };

    lottoNumbers.forEach((lottoNum) => {
      const matchInit = this.getMatchCount(lottoNum, winningNumbers, bonusNumber);

      if (matchInit.matchCount === 3) return (winningCount.three += 1);
      if (matchInit.matchCount === 4) return (winningCount.four += 1);
      if (matchInit.matchCount === 5 && matchInit.matchBonus) return (winningCount.five_bonus += 1);
      if (matchInit.matchCount === 5) return (winningCount.five += 1);
      if (matchInit.matchCount === 6) return (winningCount.six += 1);
    });

    return winningCount;
  }

  getMatchCount(lottoNum, winningNumbers, bonusNumber) {
    const matchArray = lottoNum.filter((lotto) => winningNumbers.includes(lotto));
    const matchBonus = lottoNum.includes(bonusNumber);
    return { matchCount: matchArray.length, matchBonus };
  }

  resetButton() {
    this.resetLotto();
  }

  resetLotto() {
    this.paymentCostStr = "";
    this.ticket = [];
    this.winningNumber = [];
    this.bonusNumber = 0;
    $paymentCost.value = "";
    $bonusNumber.value = "";
    this.onModalClose();
  }

  onModalShow = (result) => {
    $modal.classList.add("open");
    const winningCount = this.renderWinningCount(result);
    this.renderLottoProfit(winningCount);
  };

  onModalClose = () => {
    $modal.classList.remove("open");
  };

  handleLottoNumbersToggleButton() {
    const toggleSwitch = $(".lotto-numbers-toggle-button");
    const ul = $$(".lotto-result");
    const ticketNumber = $$(".lotto-ticket-number");

    if (toggleSwitch.checked === true) {
      ul.forEach((ul) => {
        ul.className = "d-flex flex-wrap flex-col lotto-result";
      });
      ticketNumber.forEach((ticketNumber) => {
        ticketNumber.style.display = "inline";
      });
    } else {
      ul.forEach((ul) => {
        ul.className = "d-flex flex-wrap lotto-result";
      });
      ticketNumber.forEach((ticketNumber) => {
        ticketNumber.style.display = "none";
      });
    }
  }

  makeRandomNumberArray() {
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
