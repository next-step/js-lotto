import { sanitizeNumericInput } from "../../utils/validateInput.js";

function setForm(form, onSubmit) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmit(new FormData(form));
  });

  return form;
}

export function setupPurchaseForm(onSubmit) {
  const form = document.querySelector(".purchase-section form");
  setForm(form, (formData) => {
    const purchaseAmount = formData.get("purchase-amount");
    onSubmit(purchaseAmount);
  });

  const input = form.querySelector("input");
  input.addEventListener("input", () => sanitizeNumericInput(input, 6));
}

export function setupDrawNumbersForm(onSubmit) {
  const form = document.querySelector(".draw-numbers-section form");
  setForm(form, (formData) => {
    const winningNumbers = formData.getAll("winningNumbers");
    const bonusNumber = formData.getAll("bonusNumber");
    onSubmit(winningNumbers, bonusNumber);
  });

  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", () => sanitizeNumericInput(input, 2));
  });
}

export function resetForms() {
  const purchaseForm = document.querySelector(".purchase-section form");
  const drawNumbersForm = document.querySelector(".draw-numbers-section form");

  purchaseForm.reset();
  drawNumbersForm.reset();
}
