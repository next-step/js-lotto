import { getRandomNumber } from "./utils/index.js";
import { LOTTO, CONFIRM_MESSAGE } from "./constants/index.js";

class LottoApp {
  constructor() {
    this.lottos = [];
    this.price = "";
    this.winningNumbers = [];
    this.bonusNumber = "";
    this.lottoResult = [];
    this.totalRevenue = "";
    this.isValidatedWinnerNumbers = false;
  }

  init() {
    document.querySelector(".price").addEventListener("change", (e) => this.onChangePrice(e));
    document.querySelector(".submit").addEventListener("click", () => this.onSubmitPrice());
    document.querySelector(".by-hand-submit").addEventListener("click", () => this.onByHandSubmit());
    document.querySelector(".lotto-numbers-toggle-button").addEventListener("change", () => this.onToggleButton());
    document.querySelector(".open-result-modal-button").addEventListener("click", () => this.onClickLottoResult());
    document.querySelector(".modal-close").addEventListener("click", () => this.hideModal());
    document.querySelector(".init").addEventListener("click", () => this.reset());
  }

  onChangePrice(e) {
    this.price = e.target.value || "";
  }

  onByHandSubmit() {
    const byHandNumber = new FormData(document.querySelector(".by-hand-form")).getAll("by-hand-number");

    this.lottos = [...byHandNumber];

    this.calurateLottoNumbers();
    this.renderLottosNumbers();

    document.querySelector(".by-hand-form").reset();
    document.querySelector(".by-hand-form").classList.add("hide");
  }

  onSubmitPrice() {
    if (window.confirm(CONFIRM_MESSAGE)) {
      document.querySelector(".by-hand-form").classList.remove("hide");
    } else {
      document.querySelector(".by-hand-form").classList.add("hide");
      this.calurateLottoNumbers();
      this.renderLottosNumbers();
    }

    document.querySelector(".price").value = "";
  }

  showLottoNumbers() {
    document.querySelectorAll(".lotto-number").forEach((el) => el.classList.remove("hide"));
  }

  hideLottoNumers() {
    document.querySelectorAll(".lotto-number").forEach((el) => el.classList.add("hide"));
  }

  onToggleButton() {
    const toggleStatus = document.querySelector(".lotto-numbers-toggle-button").classList.toggle("toggle");

    toggleStatus ? this.showLottoNumbers() : this.hideLottoNumers();
  }

  calurateLottoNumbers() {
    if (this.lottos.length) {
      const temp = this.lottos;

      this.lottos = Array.from({ length: Math.floor((this.price - LOTTO.PRICE) / LOTTO.PRICE) }, (lotto) => {
        lotto = new Set();

        while (lotto.size < LOTTO.COUNT) {
          lotto.add(getRandomNumber(LOTTO.MIN, LOTTO.MAX));
        }
        return [...lotto];
      });

      this.lottos.unshift(temp);
    } else {
      this.lottos = Array.from({ length: Math.floor(this.price / LOTTO.PRICE) }, (lotto) => {
        lotto = new Set();

        while (lotto.size < LOTTO.COUNT) {
          lotto.add(getRandomNumber(LOTTO.MIN, LOTTO.MAX));
        }
        return [...lotto];
      });
    }
  }

  renderLottosNumbers() {
    document.querySelector(".lotto-container").innerHTML = this.lottos
      .map((lotto) => {
        return `
        <div class="d-flex">
          <span class="mx-1 text-4xl">🎟️</span>
          <span class="mx-1 text-base lotto-number hide">${lotto}</span>
        </div>
      `;
      })
      .join("");

    document.querySelector(".total").textContent = `총 ${this.lottos.length}개를 구매하였습니다.`;
  }

  calurateLottoResult() {
    this.lottoResult = this.lottos.reduce((lottoResult, lotto) => {
      let matchingNumber = lotto.filter((el) => this.winningNumbers.includes(String(el))).length;
      const isMatchingBonusNmber = lotto.includes(Number(this.bonusNumber));
      if (matchingNumber > 2) {
        if (matchingNumber === 5 && isMatchingBonusNmber) {
          matchingNumber = matchingNumber + "+";
        }

        lottoResult.push(matchingNumber);
      }
      return lottoResult;
    }, []);

    this.totalRevenue = this.lottoResult.reduce((totalRevenue, result) => {
      switch (result) {
        case 3:
          totalRevenue += 5000;
          break;
        case 4:
          totalRevenue += 50000;
          break;
        case 5:
          totalRevenue += 1500000;
          break;
        case "5+":
          totalRevenue += 3000000;
          break;
        case 6:
          totalRevenue += 20000000;
          break;
      }
      return totalRevenue;
    }, 0);
  }

  renderLottoResult() {
    document.querySelector(".result-table").innerHTML = `
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
            <td class="p-3">${this.lottoResult.filter((el) => el === 3).length}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">4개</td>
            <td class="p-3">50,000</td>
            <td class="p-3">${this.lottoResult.filter((el) => el === 4).length}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">5개</td>
            <td class="p-3">1,500,000</td>
            <td class="p-3">${this.lottoResult.filter((el) => el === 5).length}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">5개 + 보너스볼</td>
            <td class="p-3">30,000,000</td>
            <td class="p-3">${this.lottoResult.filter((el) => el === "5+").length}개</td>
          </tr>
          <tr class="text-center">
            <td class="p-3">6개</td>
            <td class="p-3">2,000,000,000</td>
            <td class="p-3">${this.lottoResult.filter((el) => el === 6).length}개</td>
          </tr>
        </tbody>
      `;

    document.querySelector(".total-revenue").innerHTML = `당신의 총 수익률은 ${
      (this.totalRevenue / this.price) * 100
    }%입니다.`;
  }

  validateWinnigNumbers() {
    this.winningNumbers = new FormData(document.querySelector(".winning-number-form")).getAll("winning-number");
    this.bonusNumber = new FormData(document.querySelector(".winning-number-form")).get("bonus-number");

    const isCorrectWinnigNumbers = new Set(this.winningNumbers).size === 6;
    const isCorrectBonusNumbers = this.bonusNumber && !this.winningNumbers.includes(this.bonusNumber);

    if (isCorrectWinnigNumbers && isCorrectBonusNumbers) this.isValidatedWinnerNumbers = true;
    else this.isValidatedWinnerNumbers = false;
  }

  onClickLottoResult() {
    this.validateWinnigNumbers();

    if (this.isValidatedWinnerNumbers) {
      this.showModal();
      this.calurateLottoResult();
      this.renderLottoResult();
    }
  }

  showModal() {
    document.querySelector(".modal").classList.add("open");
  }

  hideModal() {
    document.querySelector(".modal").classList.remove("open");
  }

  resetInput() {
    document.querySelector(".winning-number-form").reset();
    document.querySelector(".price").value = "";
  }

  reset() {
    this.lottos = [];
    this.price = "";
    this.winningNumbers = [];
    this.bonusNumber = "";
    this.lottoResult = [];
    this.totalRevenue = "";
    this.isValidatedWinnerNumbers = false;

    this.renderLottosNumbers();
    this.renderLottoResult();
    this.resetInput();
    this.hideModal();
  }
}

new LottoApp().init();
