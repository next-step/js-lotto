const LOTTO_PRICE = 1000;
const WIN_NUMBER_COUNT = 6;
const BONUS_NUMBER_COUNT = 1;
const LOTTO_RANDOM_MAX = 45;
const LOTTO_RANDOM_LENGTH = 6;
const INPUT_NUMBER_LENGTH = 2;

const PRIZES = [
    { rank: 5, text: "3개 일치 (5,000원)", prize: 5000, count: 0 , matchingNumbers : '3개' },
    { rank: 4, text: "4개 일치 (50,000원)", prize: 50000, count: 0, matchingNumbers : '4개' },
    { rank: 3, text: "5개 일치 (1,500,000원)", prize: 1500000, count: 0, matchingNumbers : '5개' },
    { rank: 2, text: "5개 일치, 보너스 볼 일치 (30,000,000원)", prize: 30000000, count: 0, matchingNumbers : '5개 + 보너스볼' },
    { rank: 1, text: "6개 일치 (2,000,000,000원)", prize: 2000000000, count: 0, matchingNumbers : '6개' }
];

const ERROR_MESSAGE = {
    NONUMBER: '유효하지 않은 입력입니다. 1000 이상의 숫자를 입력해주세요.',
    AMOUNT_MIN: `최소 금액은 ${LOTTO_PRICE}원 이상의 숫자를 입력해주세요`,
    PUT_WIN_NUMBER_COUNT: `숫자는  ${WIN_NUMBER_COUNT}개를 입력해주세요.`,
    PUT_BONUS_NUMBER_COUNT: `숫자는  ${BONUS_NUMBER_COUNT}개를 입력해주세요.`
}
const RESULT_MESSAGE = {
    INPUT: '구입금액을 입력해 주세요: ',
    PUT_WIN_NUMBER: '당첨 번호를 입력해 주세요: ',
    PUT_BONUS_NUMBER: '보너스 번호를 입력해 주세요: ',
    RESTART: '\n다시 시작하시겠습니까? (y/n): ',
    RESULT: '당첨 통계:',
    INPUT:'모든 필드에 값을 입력해주세요.',
    LINE: '--------------------',
    PURCHASE: (numLottos) => `${numLottos}개를 구매했습니다.`,
    RESULT_COUNT: (text, count) => `${text} - ${count}개`,
    RESULT_RATE: (rate) => `당신의 총 수익률은 ${rate}%입니다.`
}
module.exports = {
    LOTTO_PRICE,
    PRIZES,
    ERROR_MESSAGE,
    RESULT_MESSAGE,
    WIN_NUMBER_COUNT,
    BONUS_NUMBER_COUNT,
    LOTTO_RANDOM_MAX,
    LOTTO_RANDOM_LENGTH,
    INPUT_NUMBER_LENGTH
};
