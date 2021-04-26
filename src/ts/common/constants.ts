export const Id = Object.freeze({
  app: "app",
  inputCost: "input-cost-component",
  purchaseInfo: "purchase-info-component",
  inputLotto: "input-lotto-component",
  resultPopup: "result-popup-component",
});

export const ClassName = Object.freeze({
  input: "input",
  lottoNumbersToggle: "lotto-numbers-toggle",
  displayNone: "d-none",
  lottoDetail: "lotto-detail",
  winningNumber: "winning-number",
  bonusNumber: "bonus-number",
});

export const AlertMsg = Object.freeze({
  InvalidCost: "로또 구입 금액을 1,000원 단위로 입력해 주세요.",
  DuplicateNumber: "로또 번호에는 중복된 숫자를 입력할 수 없습니다.",
});

export const LOTTO = Object.freeze({
  MIN_NUM: 1,
  MAX_NUM: 45,
  LEN: 6,
});
