export function submitLottoPrice() {
  return new Promise((resolve) => {
    const form = document.querySelector(".lotto-price form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      resolve(form.querySelector("input").value);
    });
  });
}

export function submitWinningLotto() {
  return new Promise((resolve) => {
    const form = document.querySelector(".winning-lotto form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const winningNumbers = Array.from(
        form.querySelectorAll('input[name="winning-number"]')
      ).map((input) => Number(input.value));
      const bonusNumber = Number(
        form.querySelector('input[name="bonus-number"]').value
      );
      resolve({ winningNumbers, bonusNumber });
    });
  });
}
