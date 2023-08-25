export const LOTTO_INFO = Object.freeze({
    SIZE: 6,
    NUMBER_MIN: 1,
    NUMBER_MAX: 45,
    PRICE: 1_000,
    WINNING_CONDITION: [
        {MATCH: 6, BONUS: false, RANK: 1},
        {MATCH: 5, BONUS: true, RANK: 2},
        {MATCH: 5, BONUS: false, RANK: 3},
        {MATCH: 4, BONUS: false, RANK: 4},
        {MATCH: 3, BONUS: false, RANK: 5},
    ],
    PRIZE: Object.freeze({
        1 : 2_000_000_000,
        2 : 30_000_000,
        3 : 1_500_000,
        4 : 50_000,
        5 : 5_000,
    })
});