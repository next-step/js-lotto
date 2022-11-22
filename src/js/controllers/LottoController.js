import LottoView from "../views/LottoView.js";
import Lotto from "../models/Lotto.js";

class LottoController {
  constructor() {
    this.lottoView = new LottoView();
    this.lotto = new Lotto();

    this.#subscribeEvents();
    this.render();
  }

  #subscribeEvents() {
    this.lottoView.$lottoNumberVisible.addEventListener(
      "change",
      this.onChangeLottoNumberVisible.bind(this)
    );
  }

  onChangeLottoNumberVisible(event) {
    this.lotto.setLottoNumberVisible(event.target.checked);

    this.render();
  }

  onGenerateLottosBy(count) {
    this.lotto.onGenerateLottosBy(count);

    this.render();
  }

  render() {
    const count = this.lotto.getPurchaseCount();
    const lottos = this.lotto.getLottos();
    const lottoNumberVisible = this.lotto.getLottoNumberVisible();

    this.lottoView.render({ lottos, count, lottoNumberVisible });
  }
}

export default LottoController;
