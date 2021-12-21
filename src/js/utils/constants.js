export const LOTTO_WINNINGS = [
	{
		idx: 0,
		matchCount: 3,
		bonusMatchCount: 1,
		matchText: "3개",
		prize: 5000,
		count: 0,
	},
	{
		idx: 1,
		matchCount: 4,
		bonusMatchCount: 1,
		matchText: "4개",
		prize: 50000,
		count: 0,
	},
	{
		idx: 2,
		matchCount: 5,
		bonusMatchCount: 0,
		matchText: "5개",
		prize: 1500000,
		count: 0,
	},
	{
		idx: 3,
		matchCount: 5,
		bonusMatchCount: 1,
		matchText: "5개 + 보너스볼",
		prize: 30000000,
		count: 0,
	},
	{
		idx: 4,
		matchCount: 6,
		bonusMatchCount: 0,
		matchText: "6개",
		prize: 2000000000,
		count: 0,
	},
];

export const CONSTANT = {
	MIN_NUMBER: 1,
	MAX_NUMBER: 45,
	WINNING_NUMBERS_LENGTH: 6,
	WINNING_NUMBERS_WITH_BONUS_LENGTH: 7,
	LOTTO_PRICE: 1000,
};

export const MESSAGE = {
	BUY_LOTTO: "로또를 구매해주세요",
	BLANK_INPUT: "빈칸을 모두 채워주세요",
	DUPLICATE_NUMBER: "겹치는 번호가 없이 입력해주세요",
};
