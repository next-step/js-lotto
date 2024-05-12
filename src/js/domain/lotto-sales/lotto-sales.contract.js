export function validateAmountPaid(amount_paid) {
  if (typeof amount_paid !== "number") {
    throw new TypeError("amount_paid는 number 타입이어야 합니다.");
  }

  if (amount_paid < 0) {
    throw new RangeError("amount_paid는 0보다 작을 수 없습니다.");
  }

  return true;
}
