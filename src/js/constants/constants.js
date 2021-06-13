export const MESSAGE = {
  PRICE_HAS_REMAINDER: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
  PRICE_UNDER_MINIMUM: '로또 구입 최소 금액은 1,000원입니다.',
  NUMBER_REQUIRED: '모든 당첨 번호를 입력해주세요.',
  NUMBER_NOT_IN_RANGE: '당첨 번호는 0부터 45까지 숫자입니다.',
  NUMBER_CANNOT_BE_DUPLICATED:
    '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};

export const LOTTO = numbers =>
  `<span class="mx-1 text-3xl">🎟️ <span class="text-2xl">${numbers}</span></span>`;

export const WINNINGNUMBER = `<input type="number" class="winning-number mx-1 text-center"/>`;

export const WINNINGMONEY = [5000, 50000, 1500000, 30000000, 2000000000];
