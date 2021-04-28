import Lotto from "./lotto.js";
import LottoMaker from "./lottoMaker.js";

export default function LottoStore() {
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
  const lottoMaker = new LottoMaker(shuffle);

  this.buyLotto = (buyNum) => {
    const lottos = [];
    const lottoNum = buyNum / LOTTO_PRICE;
    for (var i = 0; i < lottoNum; i++)
      lottos.push(new Lotto(lottoMaker.makeLotto()));
    return lottos;
  };
}

const LOTTO_PRICE = 1_000;
