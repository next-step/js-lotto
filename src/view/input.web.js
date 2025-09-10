import { LottoStore } from "../domain/lotto-store.js";

export function lottoPriceForm() {
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
