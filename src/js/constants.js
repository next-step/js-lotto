export const MESSAGE_ABOUT_UNIT_OF_AMOUNT =
  "로또 구입 금액을 1,000원 단위로 입력해 주세요.";
export const MESSAGE_ABOUT_DUPLICATION_NUMBER =
  "로또 번호에는 중복된 숫자를 입력할 수 없습니다.";

export const LOTTO_GAME_COUNT = 6;
export const MAXIMUM_NUMBER = 45;
export const PERCENT = 100;
export const MINIMUM_MATCHED_COUNT_FOR_2TH = 5;
export const MINIMUM_MATCHED_COUNT_FOR_5TH = 3;
export const BONUS_MATCHED_COUNT = 1;

const RANK = {
  RANK_5: "3",
  RANK_4: "4",
  RANK_3: "5",
  RANK_2: "bonus",
  RANK_1: "6",
};

export const RANK_BY_MATCHED_NUMBERS = {
  [RANK.RANK_5]: "rank-5",
  [RANK.RANK_4]: "rank-4",
  [RANK.RANK_3]: "rank-3",
  [RANK.RANK_2]: "rank-2",
  [RANK.RANK_1]: "rank-1",
};

export const PRICE_BY_RANK = {
  [RANK.RANK_5]: 5_000,
  [RANK.RANK_4]: 50_000,
  [RANK.RANK_3]: 1_500_000,
  [RANK.RANK_2]: 30_000_000,
  [RANK.RANK_1]: 2_000_000_000,
};

export const SUBMIT_EVENT_TARGET_IDS = [
  "purchase-input-form",
  "winning-number-confirmation-form",
];

export const CLICK_EVENT_TARGET_IDS = [
  "create-manual-lotto-button",
  "view-numbers-checkbox",
  "modal-close",
  "modal",
  "reset-lotto-button",
];

export const MANUAL_LOTTO_INPUTS_TEMPLATE = `
    <input
      type="number"
      class="manual-number mx-1 text-center"
      min="1"
      max="45"
      required
    />
    <input
      type="number"
      class="manual-number mx-1 text-center"
      min="1"
      max="45"
      required
    />
    <input
      type="number"
      class="manual-number mx-1 text-center"
      min="1"
      max="45"
      required
    />
    <input
      type="number"
      class="manual-number mx-1 text-center"
      min="1"
      max="45"
      required
    />
    <input
      type="number"
      class="manual-number mx-1 text-center"
      min="1"
      max="45"
      required
    />
    <input
      type="number"
      class="manual-number mx-1 text-center"
      min="1"
      max="45"
      required
    />
  </li>
`;
