export const buyLotto = (amountPaid) => {
  const LOTTO_ITEM_PRICE = 1000;

  const purchasedLottoCount = Math.floor(amountPaid / LOTTO_ITEM_PRICE);

  console.log(`${purchasedLottoCount}개를 구매했습니다.`);

  return purchasedLottoCount;
};
