import createLottoList from '../view/createLottoList.js';
import createPurchaseDetailsTitle from '../view/createPurchaseDetailsTitle.js';
import getLottoPurchaseNumbers from './getLottoPurchaseNumbers.js';

function purchaseLotto() {
  const purchaseList = document.querySelector('section.mt-9');
  const winningNumberForm = document.getElementById('winning-number-form');
  const purchaseInput = document.querySelector('.purchase-input');
  const purchaseValue = purchaseInput.value;

  if (!purchaseValue) {
    alert('구입금액을 입력해주세요.');
    purchaseInput.focus();
    return;
  }

  if (Number(purchaseValue) < 1000) {
    alert('값은 1000이상이어야 합니다.');
    purchaseInput.value = '';
    return;
  }

  const purchaseCount = getLottoPurchaseNumbers(purchaseValue);
  createPurchaseDetailsTitle(purchaseCount);
  createLottoList(purchaseCount);

  purchaseList.style.display = 'block';
  winningNumberForm.style.display = 'block';
}

export default purchaseLotto;