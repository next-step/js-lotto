function getLottoNum() {
  const lotto = [];
  function makeNum() {
    if (lotto.length < 7) {
      let n = Math.floor(Math.random() * 45) + 1;
      if (notSame(n)) lotto.push(n);
      makeNum();
    }
    function notSame(n) {
      return lotto.every((e) => n !== e);
    }
  }
  makeNum();
  return lotto;
}

const autoGenerateLotto = (purchasedPrice) => {
  return [...Array(purchasedPrice / 1000).keys()].map(() => getLottoNum());
};

export default autoGenerateLotto;
