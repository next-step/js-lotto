import { PriceInput } from "./components/PriceInput.js";
import { PurchaseDetail } from "./components/PurchaseDetail.js";
import { WinningNumberInput } from "./components/WinningNumberInput.js";
import { Statistics } from "./components/Statistics.js";
import { createLotto } from "./util.js";

class App {
  constructor() {
    this.#setComponents();
    this.#purchaseDetailElement.hidden = true;
    this.#winningNumberInputElement.hidden = true;
  }

  #inputPrice = 0;
  #lottos = [];

  #priceInputElement = document.querySelector("#price-input");
  #purchaseDetailElement = document.querySelector("#purchase-detail");
  #winningNumberInputElement = document.querySelector("#winning-number-input");
  #statisticsElement = document.querySelector("#statistics");

  #priceInputComponent;
  #purchseDetailComponent;
  #winningNumberInputComponent;
  #statisticsComponent;

  #onClickPriceInputConfirmButton = (value) => {
    this.#inputPrice = value;
    const count = value / 1000;
    let lottos = [];
    for (let i = 0; i < count; i++) {
      const lotto = createLotto();
      lottos.push(lotto);
    }
    this.#lottos = lottos;
    this.#purchseDetailComponent.setState(lottos);
    this.#purchaseDetailElement.hidden = false;
    this.#winningNumberInputElement.hidden = false;
  };

  #onClickWinningResultButton = (originalNumbers, bonusNumber) => {
    const data = this.#getWinningStatistics(
      originalNumbers,
      bonusNumber,
      this.#lottos
    );
    this.#onModalShow(data.statistic, data.profit);
  };

  #getWinningStatistics = (originalNumbers, bonusNumber, lottos) => {
    let result = [];
    lottos.forEach((lottoNumbers) => {
      let matchCount = 0;
      let hasMatchingBonusBall = false;
      lottoNumbers.forEach((lottoNumber) => {
        if (originalNumbers.includes(lottoNumber)) {
          matchCount++;
        }
        if (lottoNumber === bonusNumber) {
          hasMatchingBonusBall = true;
        }
      });
      result.push({ matchCount, hasMatchingBonusBall });
    });
    const statistic = {
      "3개": 0,
      "4개": 0,
      "5개": 0,
      "5개 + 보너스볼": 0,
      "6개": 0,
    };
    result.forEach((item) => {
      if (item.matchCount === 3) {
        statistic["3개"] += 1;
      }
      if (item.matchCount === 4) {
        statistic["4개"] += 1;
      }
      if (item.matchCount === 5) {
        statistic["5개"] += 1;
      }
      if (item.matchCount === 5 && item.hasMatchingBonusBall) {
        statistic["5개 + 보너스볼"] += 1;
      }
      if (item.matchCount === 6) {
        statistic["6개"] += 1;
      }
    });
    const profit = Math.floor(
      (statistic["3개"] * 5000 +
        statistic["4개"] * 50000 +
        statistic["5개"] * 1500000 +
        statistic["5개 + 보너스볼"] * 30000000 +
        statistic["6개"] * 2000000000 -
        this.#inputPrice) /
        this.#inputPrice
    );
    return { statistic, profit };
  };

  #onModalShow = (statistic, profit) => {
    this.#statisticsComponent.setState(statistic, profit);
    this.#statisticsElement.classList.add("open");
  };

  #onModalClose = () => {
    this.#statisticsElement.classList.remove("open");
  };

  #setComponents = () => {
    this.#priceInputComponent = new PriceInput(
      this.#priceInputElement,
      this.#onClickPriceInputConfirmButton
    );
    this.#purchseDetailComponent = new PurchaseDetail(
      this.#purchaseDetailElement
    );
    this.#winningNumberInputComponent = new WinningNumberInput(
      this.#winningNumberInputElement,
      this.#onClickWinningResultButton
    );
    this.#statisticsComponent = new Statistics(
      this.#statisticsElement,
      this.#onModalClose
    );
  };
}

new App();
