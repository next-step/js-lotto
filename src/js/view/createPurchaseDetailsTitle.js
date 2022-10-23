function createPurchaseDetailsTitle(count) {
  const purchaseDetailsTitle = document.querySelector('.purchase-details-title');
  const newLabel = `총 ${count}개를 구매하였습니다.`;

  purchaseDetailsTitle.innerText = newLabel;
}

export default createPurchaseDetailsTitle;
