import LottoView from "../views/LottoView.js";
import Lotto from "../models/Lotto.js";
import Modal from "../modals/index.js";
import modalTemplates from "../modals/modalTemplates.js";
import { LOTTO, MESSAGES } from "../constants.js";

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
    this.lottoView.$lastWinningNumbersForm.addEventListener(
      "submit",
      this.onCheckLottoResult.bind(this)
    );
  }

  onCheckLottoResult(e) {
    e.preventDefault();

    if (!this.isLottosGenerated()) {
      window.alert(MESSAGES.LOTTO_NOT_GENERATED);
      return;
    }

    if (!this.isLottoNumbersCorrectlyRegistered(e.target)) {
      window.alert(MESSAGES.WRONG_LOTTO_NUMBER);
      return;
    }

    Modal.getInstance()
      .setTemplate(modalTemplates.winningGameAnalytics())
      .show();
  }

  onChangeLottoNumberVisible(event) {
    this.lotto.setLottoNumberVisible(event.target.checked);

    this.render();
  }

  onGenerateLottosBy(count) {
    this.lotto.onGenerateLottosBy(count);

    this.render();
  }

  isLottosGenerated() {
    return this.lotto.getLottos().length > 0;
  }

  isLottoNumbersCorrectlyRegistered(target) {
    const winningLottoNumbers = [...Array(7)].map(
      (_, index) => +target[`lotto-number-${index + 1}`].value
    );

    if (this.isLottoNumberDuplicated(winningLottoNumbers)) {
      return false;
    }

    return winningLottoNumbers.every((number) =>
      this.isLottoNumberCorrect(number)
    );
  }

  isLottoNumberCorrect(number) {
    return LOTTO.MIN_NUMBER <= number && number <= LOTTO.MAX_NUMBER;
  }

  isLottoNumberDuplicated(numbers) {
    const unDuplicatedNumbers = new Set();
    numbers.forEach((number) => {
      unDuplicatedNumbers.add(number);
    });

    return unDuplicatedNumbers.size !== LOTTO.NUMBER_COUNT_WITH_BONUS;
  }

  render() {
    const count = this.lotto.getPurchaseCount();
    const lottos = this.lotto.getLottos();
    const lottoNumberVisible = this.lotto.getLottoNumberVisible();

    this.lottoView.render({ lottos, count, lottoNumberVisible });
  }
}

export default LottoController;
