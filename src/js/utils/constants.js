const LOTTO = {
  MONEY: 'money',
  UNIT: 1000,
  COUNTS: 6,
  MAX_VALUE: 45,
  MIN_VALUE: 1,
  BONUS_PRICE: 30000000,
  BONUS_RANK: '5개 + 보너스 볼',
};

const LOTTO_INDEX = {
  NUMBERS: ['one', 'two', 'three', 'four', 'five', 'six'],
  BONUS: 'bonus',
};

const PRICE = [
  {
    match: 6,
    bonus: false,
    money: 2000000000,
    rank: 1,
  },
  {
    match: 5,
    bonus: true,
    money: 30000000,
    rank: 2,
  },
  {
    match: 5,
    bonus: false,
    money: 1500000,
    rank: 3,
  },
  {
    match: 4,
    bonus: false,
    money: 50000,
    rank: 4,
  },
  {
    match: 3,
    bonus: false,
    money: 5000,
    rank: 5,
  },
];

const ALERT = {
  INVAILD_MONEY: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
  DUPLICATED_NUMBER: '중복된 숫자가 존재합니다.',
};

const LOCALE = 'ko-KR';

export { LOTTO, LOTTO_INDEX, ALERT, PRICE, LOCALE };
