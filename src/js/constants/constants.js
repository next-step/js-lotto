export const MESSAGE = {
  PRICE_HAS_REMAINDER: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
  PRICE_UNDER_MINIMUM: '로또 구입 최소 금액은 1,000원입니다.',
};

export const LOTTO = numbers =>
  `<span class="mx-1 text-3xl">🎟️ <span class="text-2xl">${numbers}</span></span>`;
