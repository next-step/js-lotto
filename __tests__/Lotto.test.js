import Lotto from '../src/tests/Lotto';
import { validateWinningNumbers } from '../src/tests/Winning';
import { ErrorMessages } from '../src/tests/error';

describe('로또 기능 테스트', () => {
	test('로또 1장의 가격은 1000원이다', () => {
		// given
		const lottoPrice = Lotto.price;

		// when
		// then
		expect(lottoPrice).toBe(1000);
	});

	test('로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.', () => {
		// given
		const lotto = new Lotto();

		// when
		const purchaseAmount = 5000;
		const lottoQuantity = lotto.generatePurchasedLottoNumbers(purchaseAmount);

		// then
		expect(lottoQuantity.length).toBe(5);
	});

	test('로또 번호는 1 ~ 45 사이의 무작위 수 중 중복되지 않는 6개이다.', () => {
		// given
		const lotto = new Lotto();

		// when
		const lottoNumbers = lotto.createLottoNumbers();

		// then
		expect(lottoNumbers.length).toBe(6); // 번호의 개수가 6개인지
		expect(new Set(lottoNumbers).size).toBe(6); // 6개의 번호가 중복되지 않는지
		lottoNumbers.forEach(num => {
			expect(num).toBeGreaterThanOrEqual(1); // 최소 1인지
			expect(num).toBeLessThanOrEqual(45); // 최대 45인지
		});
	});

	test('로또 당첨 번호는 1 ~ 45 사이의 무작위 수 중 중복되지 않는 6개이다.', () => {
		// given
		const lotto = new Lotto();

		// when
		const winningNumbersInput = [1, 2, 3, 4, 5, 6];

		// then
		expect(winningNumbersInput.length).toBe(6);
		expect(new Set(winningNumbersInput).size).toBe(6);
		winningNumbersInput.forEach(num => {
			expect(num).toBeGreaterThanOrEqual(1);
			expect(num).toBeLessThanOrEqual(45);
		});
	});

	test('보너스 번호는 당첨 번호와 중복될 수 없다', () => {
		// given
		const winningNumbers = [1, 2, 3, 4, 5, 6];
		const bonusNumber = 6;

		// when
		// then
		expect(() => {
			validateWinningNumbers(winningNumbers, bonusNumber);
		}).toThrow(ErrorMessages.INVALID_BONUS_NUMBER);
	});

	test('보너스 번호로 유효하지 않은 수가 입력되었을 때 에러 발생', () => {
		// given
		const winningNumbers = [1, 2, 3, 4, 5, 6];
		const bonusNumber = 90;

		// when
		// then
		expect(() => {
			validateWinningNumbers(winningNumbers, bonusNumber);
		}).toThrow(ErrorMessages.INVALID_BONUS_NUMBER_RANGE);
	});

	test('당첨 번호로 유효하지 않은 수가 입력되었을 때 에러 발생', () => {
		// given
		const bonusNumber = 10;

		// when
		const invalidWinningNumber = [40, 41, 42, 43, 44, 90];
		const invalidNumbersLength = [1, 2, 3, 4, 5, 6, 7];
		const duplicatedWinningNumbers = [1, 1, 2, 3, 4, 5];

		// then
		expect(() => {
			validateWinningNumbers(invalidWinningNumber, bonusNumber);
		}).toThrow(ErrorMessages.INVALID_WINNING_NUMBER);

		expect(() => {
			validateWinningNumbers(invalidNumbersLength, bonusNumber);
		}).toThrow(ErrorMessages.INVALID_WINNING_NUMBER_LENGTH);

		expect(() => {
			validateWinningNumbers(duplicatedWinningNumbers, bonusNumber);
		}).toThrow(ErrorMessages.DUPLICATED_WINNING_NUMBERS);
	});
});
