import Payment from './Payment.js';
import Purchase from './Purchase.js';

export default class App {
  constructor(
    {
      purchasedLottos
    }
  ) {
    this.purchasedLottos = purchasedLottos;

    this.payment = new Payment({
      $targetPayment: document.querySelector("#payment"),
      onSubmit: ( count ) => {
        this.purchase.setState(count);
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
  }

}
