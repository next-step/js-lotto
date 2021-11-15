export const UNIT_PRICE = 1_000;
export const ErrorMsgs = {
    MIN_PRICE: `최소가격은 ${UNIT_PRICE}원입니다.`,
    DUPLICATED: '중복된 숫자가 있습니다.',
    OUT_OF_RANGE: '1부터 45 사이의 정수만 입력 가능합니다.',
};
export const GRADES = {
    g5: {
        matchCount: 3,
        winPrice: 5_000,
    },
    g4: {
        matchCount: 4,
        winPrice: 50_000,
    },
    g3: {
        matchCount: 5,
        winPrice: 1_500_000,
    },
    g2: {
        matchCount: 5,
        bonusMatched: true,
        winPrice: 30_000_000,
    },
    g1: {
        matchCount: 6,
        winPrice: 2_000_000_000,
    },
};
//# sourceMappingURL=constants.js.map