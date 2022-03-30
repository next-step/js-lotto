const wallet = (function () {
  let purchasedLottos;

  function lottos() {
    return purchasedLottos;
  }

  function setLottos(lottoList) {
    purchasedLottos = lottoList;
  }

  function removeAllLottos() {
    purchasedLottos = null;
  }

  return { lottos, setLottos, removeAllLottos };
})();

export default wallet;
