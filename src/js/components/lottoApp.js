import { LottoStore } from "../domain/lottoStore.js";
import LottoBuyInput from "./lottoBuyInput.js";
import LottoView from "./lottoView.js";

export default function LottoApp() {
  const lottoStore = new LottoStore();
  const lottoView = new LottoView(this);
  new LottoBuyInput(this);

  this.buy = (price) => {
    this.lottos = lottoStore.buyLotto(price);
    lottoView.render(this.lottos);
  };
}
