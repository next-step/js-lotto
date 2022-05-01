import lottoModalView from '../../View/lottoModalView.js';
import LottoPurchaseView from '../../View/lottoPurchaseView.js';
import LottoTicketView from '../../View/lottoTicketView.js';
import LottoWinningNumberView from '../../View/lottoWinningNumberView.js';

const modal = (function () {
  return {
    handleClosedModalEvent() {
      lottoModalView.onModalClose();
    },

    handleRestartEvent() {
      LottoPurchaseView.removeInputValue();
      LottoTicketView.hideTicketUI();
      LottoTicketView.hideLottoInfoUI();
      LottoWinningNumberView.initWinningNumberInputValue();
      lottoModalView.onModalClose();
    },
  };
})();

export default modal;
