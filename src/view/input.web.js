export function onSubmitLottoPrice(handler) {
  const form = document.querySelector(".lotto-price form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handler(form.querySelector("input").value);
  });
}

export function onSubmitWinningLotto(handler) {
  const form = document.querySelector(".winning-lotto form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const winningNumbers = Array.from(
      form.querySelectorAll('input[name="winning-number"]')
    ).map((input) => Number(input.value));
    const bonusNumber = Number(
      form.querySelector('input[name="bonus-number"]').value
    );
    handler({ winningNumbers, bonusNumber });
  });
}
