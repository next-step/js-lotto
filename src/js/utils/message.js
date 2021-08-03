import { makeMoneyComma } from "./number.js";

export const MINIMUM_LOTTO_MONEY = (minimum) =>
  `값은 ${makeMoneyComma(minimum)} 이상이어야 합니다.`;

export const UNIT_LOTTO_MONEY = (unit) =>
  `로또 구입 금액을 ${makeMoneyComma(unit)}원 단위로 입력해 주세요.`;
