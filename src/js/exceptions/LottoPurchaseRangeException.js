import LottoShop from "../domain/LottoShop.js";

export default class LottoPurchaseRangeException extends Error {
    constructor() {
        super(`구매 금액을 ${LottoShop.PURCHASE_MIN_PRICE} ~ ${LottoShop.PURCHASE_MAX_PRICE}로 입력해주세요!`);
    }
}