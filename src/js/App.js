import Payment from './Payment.js';
import Purchase from './Purchase.js';
import WinningNumbers from './WinningNumbers.js';
import ResultModal from './ResultModal.js';

export default class App {
  constructor(
    {
      purchasedLottos,
      winningNumberArray,
    }
  ) {
    this.purchasedLottos = purchasedLottos;
    this.winningNumberArray = winningNumberArray;

    this.payment = new Payment({
      $targetPayment: document.querySelector("#payment"),
      onSubmit: ( count ) => {
        this.purchase.setState(count);
        this.winningNumbers.render();
      }
    });
    
    this.purchase = new Purchase({
      count: 0,
      purchasedLottos,
      $targetPurchaseInfo: document.querySelector('.purchase-info'),
      $targetPurchaseCount: document.querySelector('.purchase-count'),
      $targetPurchaseToggle: document.querySelector('.purchase-toggle'),
      $targetLottoInfo: document.querySelector('.lotto-info')
    })

    this.winningNumbers = new WinningNumbers({
      $targetWinningNumbers: document.querySelector('#winning-numbers'),
    })

    this.resultModal = new ResultModal({
      $showResultButton: document.querySelector('.open-result-modal-button'),
			$modal: document.querySelector(".modal"),
			$modalClose: document.querySelector(".modal-close"),
		});
  }

}
