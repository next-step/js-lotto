export function setupPurchaseForm(onSubmit) {
  const form = document.querySelector(".purchase-section form");

  const input = form.querySelector("input");
  input.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "").slice(0, 6);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const purchaseAmount = formData.get("purchase-amount");
    onSubmit(purchaseAmount);
  });
}

export function setupDrawNumbersForm(onSubmit) {
  const form = document.querySelector(".draw-numbers-section form");

  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      event.target.value = event.target.value
        .replace(/[^0-9]/g, "")
        .slice(0, 2);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const winningNumbers = formData.getAll("winningNumbers");
    const bonusNumber = formData.getAll("bonusNumber");
    onSubmit(winningNumbers, bonusNumber);
  });
}

export function resetForm() {
  const purchaseForm = document.querySelector(".purchase-section form");
  const drawNumbersForm = document.querySelector(".draw-numbers-section form");

  purchaseForm.reset();
  drawNumbersForm.reset();
}
