import Controller from './Controller.js';
import storage from './storage.js';
import Store from './Store.js';
import PurchaseFormView from './views/PurchaseFormView.js';
import PurchaseSectionView from './views/PurchaseSectionView.js';
import RecentLottoFormView from './views/RecentLottoFormView.js';
import ResultModalView from './views/ResultModalView.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
  const store = new Store(storage);

  const views = {
    purchaseFormView: new PurchaseFormView(),
    purchaseSectionView: new PurchaseSectionView(),
    recentLottoFormView: new RecentLottoFormView(),
    resultModalView: new ResultModalView(),
  };

  new Controller(store, views);
}
