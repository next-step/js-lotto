const ERROR = {
  NOT_EMPTY: '비어있을 수 없음',
  THOUSAND: '1000으로 나누어 떨어져야함',
  DUPLICATE: '중복된 값 노노노',
  NOT_VALID_NUM: '0 부터 45까지의 수만 괜찮음',
}

const VALID_PRICE = 5000;
const LOTTO_COUNT = VALID_PRICE  / 1000;

export {
  VALID_PRICE,
  LOTTO_COUNT,
  ERROR,
}