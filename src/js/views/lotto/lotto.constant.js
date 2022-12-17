export const INITIAL_STATE = {
  numberList: [],
  numberMin: 0,
  numberMax: 0,
  price: 0,
  winningNumberCnt: 0,
  lottoList: [],
}

export const LOTTO_MACHINE_CONFIG = {
  price: 1000,
  winningNumberCnt: 6,
  numberMin: 1,
  numberMax: 45,
}

export const DOM_ELEMENT = {
  lottoImg: `<span class="mx-1 text-4xl lotto-img" >🎟️ </span>`,
}

export const ERROR_TEXT = {
  EMPTY_PURCHASE_AMOUNT: '구입 금액을 입력해주세요.',
  INVALID_PURCHASE_AMOUNT: '원 단위로 구매 가능합니다.',
}

export const LOTTO_REVENUE_PRICE = {
  three: 5_000,
  four: 50000,
  five: 1_500_000,
  fiveBonus: 30_000_000,
  six: 2_000_000_000,
}
