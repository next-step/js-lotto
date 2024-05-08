class Product {
  #name;
  #price;

  constructor(name, price) {
    if (typeof name !== 'string') {
      throw new TypeError('문자열이 아닙니다.');
    }
    if (name.trim().length === 0) {
      throw new TypeError('빈 문자열 입니다.');
    }
    if (name.trim().length > 15) {
      throw new TypeError('최대 길이를 초과하였습니다.');
    }
    if (price > Number.MAX_SAFE_INTEGER || !Number.isInteger(price)) {
      throw new TypeError('price는 표현가능한 숫자형이어야 합니다.');
    }
    this.#name = name.trim();
    this.#price = price;
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }

  buy(cost) {
    if (cost > Number.MAX_SAFE_INTEGER || !Number.isInteger(cost)) {
      throw new TypeError(
        'buy로 전달된 매개변수는 표현가능한 숫자형이어야 합니다.'
      );
    }
    if (cost < this.#price) {
      throw new Error('금액이 부족합니다.');
    }
    return cost - this.#price;
  }
}

export default Product;
