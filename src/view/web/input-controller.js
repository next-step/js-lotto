import { setupPurchaseForm, setupDrawNumbersForm, resetForms } from "./input";

export function handlePurchaseFormSubmit({ onSubmit }) {
  setupPurchaseForm((value) => {
    const purchasedAmount = Number(value);
    onSubmit(purchasedAmount);
  });
}

export function handleDrawNumbersFormSubmit({ onSubmit }) {
  setupDrawNumbersForm((winningNumbersInput, bonusNumberInput) => {
    const winningNumbers = winningNumbersInput.map((value) => Number(value));
    const bonusNumbers = bonusNumberInput.map((value) => Number(value));

    onSubmit(winningNumbers, bonusNumbers);
  });
}

export { resetForms };
