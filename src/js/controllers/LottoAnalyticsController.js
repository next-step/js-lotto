import LottoAnalytics from "../models/LottoAnalytics.js";
import LottoAnalyticsView from "../views/LottoAnalyticsView.js";
import Modal from "../modals/index.js";

class LottoAnalyticsController {
  constructor() {
    this.lottoAnalytics = new LottoAnalytics();
    this.lottoAnalyticsView = new LottoAnalyticsView();
  }

  /**
   * @param params.winningNumbers
   * @param params.lottoNumbers
   * @param params.investments
   */
  onAnalyzeLottoResults(params) {
    this.lottoAnalytics.onAnalyze(params);

    this.onAnalyticsModalShow();
  }

  onAnalyticsModalShow() {
    const analytics = this.lottoAnalytics.getAnalytics();
    const winningRates = this.lottoAnalytics.getWinningRates();

    Modal.getInstance()
      .setTemplate(
        this.lottoAnalyticsView.templateAnalyticsModal(analytics, winningRates)
      )
      .show();
  }
}

export default LottoAnalyticsController;
