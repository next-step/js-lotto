import Controller from './Controller.js';
import storage from './storage.js';
import Store from './Store.js';
import PurchaseFormView from './views/PurchaseFormView.js';
import PurchaseSectionView from './views/PurchaseSectionView.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
  const store = new Store(storage);

  const views = {
    purchaseFormView: new PurchaseFormView(),
    purchaseSectionView: new PurchaseSectionView(),
  };

  new Controller(store, views);
}
