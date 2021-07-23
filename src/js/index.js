import Controller from './Controller.js';
import storage from './storage.js';
import Store from './Store.js';
import PurchaseFormView from './views/PurchaseFormView.js';
import PurchaseSectionDetailView from './views/PurchaseSectionDetailView.js';
import PurchaseSectionInfoView from './views/PurchaseSectionInfoView.js';
import RecentLottoFormView from './views/RecentLottoFormView.js';
import ResultModalView from './views/ResultModalView.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
  const store = new Store(storage);

  const views = {
    purchaseFormView: new PurchaseFormView(),
    purchaseSectionInfoView: new PurchaseSectionInfoView(),
    purchaseSectionDetailView: new PurchaseSectionDetailView(),
    recentLottoFormView: new RecentLottoFormView(),
    resultModalView: new ResultModalView(),
  };

  new Controller(store, views);
}
