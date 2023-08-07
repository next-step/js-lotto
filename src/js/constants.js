const LOTTO_PRICE = 1000;

const PRIZES = [
    { rank: "1등", match: 6, prize: "2,000,000,000원" },
    { rank: "2등", match: 5, bonusMatch: true, prize: "30,000,000원" },
    { rank: "3등", match: 5, prize: "1,500,000원" },
    { rank: "4등", match: 4, prize: "50,000원" },
    { rank: "5등", match: 3, prize: "5,000원" },
];

const ERROR_MESSAGE = {
    AMOUNT_MIN: `촤소 금액은 ${LOTTO_PRICE}원 이상의 숫자를 입력해주세요`,
}
const RESULT_MESSAGE = {
    RESULT: '당첨 통계:',
    RESULT_COUNT: (index,rank) => `${index + 1}번 로또: ${rank}`,
    RESULT_COUNT_NULL: (index) => `${index + 1}번 로또: 꽝!`,
    RESULT_AMOUNT: (totalPrize)=>`\n총 당첨금: ${totalPrize.toLocaleString()}원`,
    RESULT_RATE: (totalPrize,lottos)=>`수익률: ${(totalPrize / (lottos.length * LOTTO_PRICE) * 100).toFixed(2)}%`
}
module.exports = {
    LOTTO_PRICE,
    PRIZES,
    ERROR_MESSAGE,
    RESULT_MESSAGE,
};
