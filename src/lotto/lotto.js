const LOTTO_PRICE = 1000;

class Lotto {}

const createLotto = (purchaseAmount) => {
  const lottoCount = Math.floor(parseInt(purchaseAmount) / LOTTO_PRICE);
  return new Array(lottoCount).fill(null).map(() => new Lotto());
};

export default { Lotto, LOTTO_PRICE, createLotto };
