export const buyLotto = (amountPaid) => {
  const LOTTO_ITEM_PRICE = 1000;

  if (amountPaid < LOTTO_ITEM_PRICE) {
    throw new Error("로또는 1,000원 이상부터 구매 가능합니다.");
  }

  const purchasedLottoCount = Math.floor(amountPaid / LOTTO_ITEM_PRICE);

  console.log(`${purchasedLottoCount}개를 구매했습니다.`);

  return purchasedLottoCount;
};
