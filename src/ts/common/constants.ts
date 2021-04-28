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
  lottoItem: "lotto-item",
  lottoDetail: "lotto-detail",
  winningNumber: "winning-number",
  bonusNumber: "bonus-number",
  restartBtn: "restart-btn",
  open: "open",
  closeX: "close-x",
  modalInner: "modal-inner",
  btn: "btn",
});

export const AlertMsg = Object.freeze({
  InvalidCost: "로또 구입 금액을 1,000원 단위로 입력해 주세요.",
  DuplicateNumber: "로또 번호에는 중복된 숫자를 입력할 수 없습니다.",
});

export const LottoConfig = Object.freeze({
  MIN_NUM: 1,
  MAX_NUM: 45,
  LEN: 6,
  Price: 1000,
});

export const RewardByMatchCnt = Object.freeze([
  [0, 0],
  [0, 0],
  [0, 0],
  [5000, 5000],
  [50000, 50000],
  [1500000, 30000000],
  [2000000000, 2000000000],
]);
