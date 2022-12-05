import LottoAnalytics from "../models/LottoAnalytics.js";
import LottoAnalyticsView from "../views/LottoAnalyticsView.js";
import Modal from "../modals/index.js";

class LottoAnalyticsController {
  #lottoAnalytics;
  #lottoAnalyticsView;
  #modal;

  constructor() {
    this.#lottoAnalytics = new LottoAnalytics();
    this.#lottoAnalyticsView = new LottoAnalyticsView();
  }

  /**
   * @param params.winningNumbers
   * @param params.lottoNumbers
   * @param params.investments
   */
  onAnalyzeLottoResults(params) {
    this.#lottoAnalytics.onAnalyze(params);

    this.#onAnalyticsModalShow();
  }

  #onAnalyticsModalShow() {
    const analytics = this.#lottoAnalytics.getAnalytics();
    const winningRates = this.#lottoAnalytics.getWinningRates();

    this.#modal = Modal.getInstance();

    this.#modal
      .setTemplate(
        this.#lottoAnalyticsView.templateAnalyticsModal(analytics, winningRates)
      )
      .show()
      .setAttributes(this.#subscribeAnalyticsModalEvents.bind(this));
  }

  #subscribeAnalyticsModalEvents($modal) {
    const closeModalButton = $modal.querySelector("#modal-close-button");
    const initButton = $modal.querySelector("#init-button");

    closeModalButton.addEventListener("click", () => {
      this.#lottoAnalytics.clear();
    });
    initButton.addEventListener("click", () => {
      this.#lottoAnalytics.clear();
      this.#modal.hide();

      const event = new CustomEvent("@clear");
      document.dispatchEvent(event);
    });
  }
}

export default LottoAnalyticsController;
