export function validateAmountPaid(amountPaid) {
  if (typeof amountPaid !== "number" || isNaN(amountPaid)) {
    throw new TypeError("amountPaid는 number 타입이어야 합니다.");
  }

  if (amountPaid < 0) {
    throw new RangeError("amountPaid는 0보다 작을 수 없습니다.");
  }

  return true;
}
