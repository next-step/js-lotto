import {
  LOTTO_NUMBER_LENGHT,
  LOTTO_MAX_VALUE,
  LOTTO_PRICE,
  LOTTO_NUMBER_SEPARATOR,
  ERROR_MESSAGE,
} from "./util/constant.js";

import { PurchasedLottos } from "./view/purchased-lottos.js";
import { TicketList } from "./view/ticket-list.js";

import { LottoModel } from "./model/index.js";

class App {
  #ticketList;
  #purchasedLotto;

  #model;

  constructor(appElement) {
    this.#model = new LottoModel({
      numberLenght: LOTTO_NUMBER_LENGHT,
      maxValue: LOTTO_MAX_VALUE,
      price: LOTTO_PRICE,
    });

    this.#ticketList = new TicketList(
      appElement.querySelector("#lotto-icons"),
      LOTTO_NUMBER_SEPARATOR
    );

    this.#purchasedLotto = new PurchasedLottos(
      appElement.querySelector("#purchased-lottos")
    );

    const inputPriceForm = appElement.querySelector("#input-price-form");
    this.#attachInputPriceFormEvent(inputPriceForm);

    const lottoNumbersToggleButton = appElement.querySelector(
      ".lotto-numbers-toggle-button"
    );
    this.#attachLottoNumbersToggleEvent(lottoNumbersToggleButton);
  }

  #attachInputPriceFormEvent(element) {
    element.addEventListener("submit", (e) => {
      e.preventDefault();

      const payment = element.querySelector("input").value;
      this.#purchaseLotto(payment);
    });
  }

  #attachLottoNumbersToggleEvent(element) {
    element.addEventListener("click", (e) => {
      const checked = e.target.checked;
      this.#handleToggleButton(checked);
    });
  }

  #purchaseLotto(payment) {
    if (!this.#model.isPriceUnit(payment)) {
      window.alert(ERROR_MESSAGE.NOT_MATCHED_LOTTO_PRICE);
      return;
    }

    this.#model.autoBuy(payment);

    this.#renderPurchaedLottoContents();
    this.#handleToggleButton(false);
    this.#purchasedLotto.display();
  }

  #renderPurchaedLottoContents() {
    this.#purchasedLotto.setNumber(this.#model.tickets().length);
    this.#ticketList.setTickets(this.#model.tickets());
  }

  #handleToggleButton(checked) {
    this.#purchasedLotto.handleToggleButton(checked);

    if (checked) {
      this.#ticketList.displayNumber();
    } else {
      this.#ticketList.hideNumber();
    }
  }
}

new App(document.querySelector("#app"));
