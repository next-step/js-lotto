import { getRandomNumber } from "./utils/index.js";
import { LOTTO } from "./constants/index.js";

class LottoApp {
  constructor() {
    this.lottos = [];
    this.price = "";
    this.winningNumbers = [];
    this.bonusNumber = "";
    this.lottoResult = [];
    this.totalRevenue = "";
  }

  init() {
    document.querySelector(".price").addEventListener("change", (e) => this.onChangePrice(e));
    document.querySelector(".submit").addEventListener("click", () => this.onSubmitPrice());
    document.querySelector(".lotto-numbers-toggle-button").addEventListener("change", () => this.onToggleButton());
    document.querySelector(".winning-number-form").addEventListener("change", (e) => this.onChangeWinningNumbers(e));
    document.querySelector(".open-result-modal-button").addEventListener("click", () => this.onClickLottoResult());
    document.querySelector(".modal-close").addEventListener("click", () => this.hideModal());
    document.querySelector(".init").addEventListener("click", () => this.reset());
  }

  onChangePrice(e) {
    this.price = e.target.value || "";
  }

  onSubmitPrice() {
    this.calurateLottoNumbers();
    this.renderLottosNumbers();
  }

  showLottoNumbers() {
    document.querySelectorAll(".lotto-number").forEach((el) => el.classList.remove("hide"));
  }

  hideLottoNumers() {
    document.querySelectorAll(".lotto-number").forEach((el) => el.classList.add("hide"));
  }

  onToggleButton() {
    const toggleStatus = document.querySelector(".lotto-numbers-toggle-button").classList.toggle("button");

    toggleStatus ? this.showLottoNumbers() : this.hideLottoNumers();
  }

  calurateLottoNumbers() {
    this.lottos = Array.from({ length: Math.floor(this.price / LOTTO.PRICE) }, (lotto) => {
      lotto = new Set();

      while (lotto.size < LOTTO.COUNT) {
        lotto.add(getRandomNumber(LOTTO.MIN, LOTTO.MAX));
      }
      return [...lotto];
    });
  }

  renderLottosNumbers() {
    document.querySelector(".lotto-container").innerHTML = this.lottos.map((lotto) => {
      return `
        <div class="d-flex">
          <span class="mx-1 text-4xl">🎟️ </span>
          <span class="mx-1 text-base lotto-number hide">${lotto.join(", ")}</span>
        </div>
      `;
    });

    document.querySelector(".total").textContent = `총 ${this.lottos.length}개를 구매하였습니다.`;
  }

  onChangeWinningNumbers(e) {
    e.preventDefault();

    if (e.target.classList.contains("winning-number")) {
      if (this.winningNumbers.includes(e.target.value)) {
        e.target.value = "";

        return;
      }

      this.winningNumbers.push(e.target.value);
    }

    if (e.target.classList.contains("bonus-number")) {
      this.bonusNumber = e.target.value;
    }
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

  onClickLottoResult() {
    if (this.winningNumbers.length !== 6 && !this.bonusNumber) return;

    this.showModal();
    this.calurateLottoResult();
    this.renderLottoResult();
  }

  showModal() {
    document.querySelector(".modal").classList.add("open");
  }

  hideModal() {
    document.querySelector(".modal").classList.remove("open");
  }

  reset() {
    this.lottos = [];
    this.price = "";
    this.winningNumbers = [];
    this.bonusNumber = "";
    this.lottoResult = [];
    this.totalRevenue = "";

    this.renderLottosNumbers();
    this.renderLottoResult();
    this.hideModal();
  }
}

new LottoApp().init();
