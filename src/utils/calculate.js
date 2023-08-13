import { SINGLE_LOTTO_PRICE } from "../data/constant.js";

// 가격 입력 후 몇 장 구매할 수 있는 지 알려주는 함수
export const calcLottoCount = (price) => {
  return price / SINGLE_LOTTO_PRICE;
};

// 1부터 45까지의 랜덤 숫자 생성
export const createRandomLottoNumber = () => {
  return Math.floor(Math.random() * 45) + 1;
};
