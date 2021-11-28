export const LOTTO_PRICE = 1000;

export const AVAILABLE_PRICE = Object.freeze({
  MIN: LOTTO_PRICE,
  MAX: LOTTO_PRICE * 100
});

export const ERROR_MESSAGES = {
  DUPLICATE_NUMBER: "로또 번호에는 중복된 숫자를 입력할 수 없습니다."
};

export const WINNINGS = Object.freeze({
  NUM3: {
    text: "3개",
    price: 5000
  },
  NUM4: {
    text: "4개",
    price: 50000
  },
  NUM5: {
    text: "5개",
    price: 1500000
  },
  NUM5_BONUS: {
    text: "5개 + 보너스볼",
    price: 30000000
  },
  NUM6: {
    text: "6개",
    price: 2000000000
  }
});
