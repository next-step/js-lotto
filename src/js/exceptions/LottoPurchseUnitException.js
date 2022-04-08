import { LottoPurchase } from "../domain/LottoPurchase.js";

export class LottoPurchaseUnitException extends Error {
    constructor() {
        super(`구매 금액을 ${LottoPurchase.LOTTO_UNIT}원 단위로 입력해주세요.`);
    }
}
