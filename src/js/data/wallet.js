import { LOTTO_PRICE } from '../constants/lotto.js';

const wallet = (function () {
  let purchasedLottos;

  function lottos() {
    return purchasedLottos.map((purchasedLotto) => purchasedLotto.value);
  }

  function setLottos(lottoList) {
    purchasedLottos = lottoList;
  }

  function removeAllLottos() {
    purchasedLottos = null;
  }

  function purchasedPrice() {
    return this.lottos().length * LOTTO_PRICE;
  }

  return { lottos, setLottos, purchasedPrice };
})();

export default wallet;
