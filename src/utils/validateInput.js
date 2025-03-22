export function validateNumericInput(input, maxLength) {
  input.value = input.value.replace(/[^0-9]/g, "").slice(0, maxLength);
}
