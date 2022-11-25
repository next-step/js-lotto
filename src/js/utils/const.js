export const PRICE_PER_UNIT = 1000;
export const PRICE_MIN = 1000;
export const PRICE_MAX = 10000;
export const LOTTO_RANGE_MIN = 1;
export const LOTTO_RANGE_MAX = 45;
export const LOTTO_LIMIT_DIGITS = 6;
export const LOTTO_LIMIT_DIGITS_BONUS_NUMBER = 7;

export const ERROR_MESSAGE = {
    PriceRequired: '로또 구입 금액을 입력해 주세요.',
    PriceMinInsufficient: '1000원 이하로 구입할 수 없습니다.',
    PriceMaxExceeded: '10000원 이상 구입할 수 없습니다.',
    IncorrectUnit: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
    StatsNumbersRequired: '로또 번호와 보너스 번호를 모두 입력해 주세요.',
    NotAllowedDuplicatedValue: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
    OutOfNumberRange: '로또 번호는 1 ~ 45사이의 번호만 입력할 수 있습니다.'
}

export const SectionType = {
    Purchase: 'Purchase',
    Stats: 'Stats'
}

export const winStats = [
    {
        matching: 3,
        prize: 5_000,
        tickets: 0,
        isBonus: false
    },
    {
        matching: 4,
        prize: 50_000,
        tickets: 0,
        isBonus: false
    },
    {
        matching: 5,
        prize: 1_500_000,
        tickets: 0,
        isBonus: false
    },
    {
        matching: 6,
        prize: 30_000_000,
        tickets: 0,
        isBonus: true
    },
    {
        matching: 6,
        prize: 2_000_000_000,
        tickets: 0,
        isBonus: false
    }
]

Object.freeze(SectionType);
Object.freeze(winStats);
