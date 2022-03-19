import { validateCurry, range } from '../utils/index.js';
import { issueLottos } from '../business/index.js';

const validateMoney = (money) => {
  if (!money) throw '금액을 입력하세요.';

  if (money < 1000) throw '복권 최소 금액은 1000원 입니다.';

  if (money % 1000) throw '금액 단위를 확인하세요.';

  return money;
};

export const buy = (money) => {
  const either = validateCurry(() => validateMoney(money));
  const amount = money / 1000;
  return either(() => ({
    numbers: range(amount, () => issueLottos(6, 45)) ?? [],
    size: amount ?? 0,
  }));
};
