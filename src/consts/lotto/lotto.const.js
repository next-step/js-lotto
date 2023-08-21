export const DEFAULT_LOTTO_INFO = Object.freeze({
    PRICE: 1_000,
    PRIZE: Object.freeze({
        1 : 2_000_000_000,
        2 : 30_000_000,
        3 : 1_500_000,
        4 : 50_000,
        5 : 5_000,
    })
});

export const LOTTO = Object.freeze({
    SIZE: 6,
    NUMBER_MIN: 1,
    NUMBER_MAX: 45,
})