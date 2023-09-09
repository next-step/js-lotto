export const DEFAULT_PRICE = 1000

export const LOTTO_RANK = {
  FIRST: '6',
  SECOND: '5+',
  THIRD: '5',
  FOURTH: '4',
  FIFTH: '3'
}

export const LOTTO_PRIZE = {
  [LOTTO_RANK.FIRST]: 2000000000,
  [LOTTO_RANK.SECOND]: 30000000,
  [LOTTO_RANK.THIRD]: 1500000,
  [LOTTO_RANK.FOURTH]: 50000,
  [LOTTO_RANK.FIFTH]: 5000
}

export const LOTTO_RESULT_TABLE = [
  { score: '3개', price: '5,000' },
  { score: '4개', price: '50,000' },
  { score: '5개', price: '1,500,000' },
  { score: '5개 + 보너스볼', price: '30,000,000' },
  { score: '6개', price: '2,000,000,000' }
]
