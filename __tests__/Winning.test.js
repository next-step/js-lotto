describe('로또 당첨 테스트', () => {
	test('사용자가 구매한 로또 번호와 당첨 번호를 비교한다', () => {
		// given
		const userInputWinningNumber = [1, 2, 3, 4, 5, 6];
		const userInputBonusNumber = 7;

		const lottoNumbers = [3, 4, 5, 6, 7, 8];

		// when
		const matches = userInputWinningNumber.filter(number =>
			lottoNumbers.includes(number)
		).length;

		if (matches.length === 5 && lottoNumbers.includes(userInputBonusNumber)) {
			matches.length += 1;
		}

		// then
		expect(matches).toBe(4);
	});
});
