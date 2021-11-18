export type AnyObj = { [key: string]: any }
export type StrObj = { [key: string]: string }
export type Elem = HTMLElement | string
export type LottoSet = [number, number, number, number, number, number]
export type WinningList = { [key: keyof typeof GRADES]: number }
export type GRADE = {
  matchCount: number
  winPrice: number
  bonusMatched?: boolean
}

export const UNIT_PRICE = 1_000
export const MIN_NUM = 1
export const MAX_NUM = 45
export const NUMBERS_PER_LOTTO = 6

export const ErrorMsgs = {
  MIN_PRICE: `최소가격은 ${UNIT_PRICE}원입니다.`,
  DUPLICATED: '중복된 숫자가 있습니다.',
  OUT_OF_RANGE: `${MIN_NUM}부터 ${MAX_NUM} 사이의 정수만 입력 가능합니다.`,
}

export const GRADES: {
  [key: string]: GRADE
} = {
  g1: {
    matchCount: 6,
    winPrice: 2_000_000_000,
  },
  g2: {
    matchCount: 5,
    bonusMatched: true,
    winPrice: 30_000_000,
  },
  g3: {
    matchCount: 5,
    winPrice: 1_500_000,
  },
  g4: {
    matchCount: 4,
    winPrice: 50_000,
  },
  g5: {
    matchCount: 3,
    winPrice: 5_000,
  },
}
