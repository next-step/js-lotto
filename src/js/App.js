import { PriceInput } from "./components/PriceInput.js";
import { PurchaseDetail } from "./components/PurchaseDetail.js";

import { WinningNumberInput } from "./components/WinningNumberInput.js";
import { Statistics } from "./components/Statistics.js";
import { LottoService } from "./lotto-service.js";

class App {
  constructor() {
    this.#lottoService = new LottoService();
    this.#setComponents();
    this.#purchaseDetailElement.hidden = true;
    this.#winningNumberInputElement.hidden = true;
  }

  #inputPrice = 0;
  #lottos = [];

  #lottoService;

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
    this.#lottos = this.#lottoService.getLottos(this.#inputPrice);
    this.#purchseDetailComponent.setState(this.#lottos);
    this.#purchaseDetailElement.hidden = false;
    this.#winningNumberInputElement.hidden = false;
  };

  #onClickWinningResultButton = (originalNumbers, bonusNumber) => {
    const data = {};
    data.statistic = this.#lottoService.getStatistics(
      originalNumbers,
      bonusNumber,
      this.#lottos
    );
    data.profit = this.#lottoService.getProfit(
      data.statistic,
      this.#inputPrice
    );

    this.#onModalShow(data.statistic, data.profit);
  };

  #onClickRestartButton = () => {
    this.#onModalClose();
    this.#inputPrice = 0;
    this.#lottos = [];

    this.#priceInputComponent.clear();
    this.#winningNumberInputComponent.clear();

    this.#purchaseDetailElement.hidden = true;
    this.#winningNumberInputElement.hidden = true;
  };

  #onModalShow = (statistic, profit) => {
    this.#statisticsComponent.setState(
      statistic,
      profit,
      this.#onModalClose,
      this.#onClickRestartButton
    );
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
      this.#onModalClose,
      this.#onClickRestartButton
    );
  };
}

new App();
