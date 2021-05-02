import { LottoStore } from "../domain/lottoStore.js";
import { Winnning } from "../domain/winning.js";
import WinningLotto from "../domain/winningLotto.js";
import LottoBuyInput from "./lottoBuyInput.js";
import LottoModal from "./lottoModal.js";
import LottoView from "./lottoView.js";
import LottoWinningInput from "./lottoWinningInput.js";

export default function LottoApp() {
  const lottoStore = new LottoStore();
  const lottoView = new LottoView(this);
  const lottoModal = new LottoModal(this);
  const winning = new Winnning();
  new LottoBuyInput(this);
  new LottoWinningInput(this);

  this.buy = (price) => {
    this.lottos = lottoStore.buyLotto(price);
    lottoView.render(this.lottos);
  };

  this.win = ([bonus, ...numbers]) => {
    this.winningLotto = new WinningLotto(numbers, bonus);
    this.lottos &&
      this.winningLotto &&
      winning.matchAll(this.winningLotto, this.lottos);
    lottoModal.open(winning.showResult(), winning.yields());
  };
}
