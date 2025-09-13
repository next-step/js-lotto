import { LottoNumber } from "../domain/lotto-number.js";
import { LottoStore } from "../domain/lotto-store.js";
import { Lotto } from "../domain/lotto.js";

export function submitLottoPrice() {
  return new Promise((resolve) => {
    const form = document.querySelector(".lotto-price form");
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        try {
          const lottoStore = new LottoStore(form.querySelector("input").value);
          resolve(lottoStore);
        } catch (error) {
          alert(error.message);
        }
      },
      { once: true }
    );
  });
}

export function submitWinningLotto(lottoStore, lottoList) {
  return new Promise((resolve) => {
    const container = document.querySelector(".winning-lotto");
    container.style.display = "block";
    const form = document.querySelector(".winning-lotto form");
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        try {
          const winningNumberInput = form.querySelectorAll(
            'input[name="winning-number"]'
          );
          const winningLotto = new Lotto(
            Array.from(winningNumberInput).map((input) => Number(input.value))
          );

          const bonusNumberInput = form.querySelector(
            'input[name="bonus-number"]'
          );
          const bonusNumber = new LottoNumber(Number(bonusNumberInput.value));
          lottoStore.validateBonusNumber(winningLotto, bonusNumber);

          const rankList = lottoList.map((lotto) =>
            lotto.prize(winningLotto, bonusNumber)
          );

          resolve(rankList);
        } catch (error) {
          alert(error.message);
        }
      },
      { once: true }
    );
  });
}
