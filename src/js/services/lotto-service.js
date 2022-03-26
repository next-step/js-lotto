import {
	randomItem,
	hasDuplicates,
	range,
	divmod,
	eventBus,
} from '../lib/index.js';
import LottoTicket from '../model/lotto-ticket.js';
import {EVENT} from '../constants/index.js';
import LottoResult from '../model/lotto-result.js';

export const LOTTO_PRICE = 1000;
export const LOTTO_COUNT = 6;
export const MINUMUM_LOTTO_VALUE = 1;
export const MAXIMUM_LOTTO_VALUE = 45;

const MESSAGES = {
	NON_UNIT_VALUE_ALERT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
	MANUAL_LOTTO_COUNT_ALERT:
		'수동 구매 갯수가 구입 금액으로 구입 가능한 갯수보다 큽니다.',
	HAS_DUPLICATES_IN_WINNING_NUMBERS_ALERT:
		'로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};

class LottoService {
	constructor() {
		this.lottoNumbers = [...range(MINUMUM_LOTTO_VALUE, MAXIMUM_LOTTO_VALUE)];
		this.autoLottoTickets = [];
		this.lottoResult = undefined;
	}

	purchaseLotto({purchaseAmount}) {
		const [totalLottoCount, remainder] = divmod(purchaseAmount, LOTTO_PRICE);
		const autoLottoCount = totalLottoCount;

		if (remainder) {
			throw new Error(MESSAGES.NON_UNIT_VALUE_ALERT);
		}

		this.autoLottoTickets = [...range(autoLottoCount)].map(() =>
			this.generateRandomLotto(),
		);

		eventBus.emit(EVENT.PURCHASE_LOTTO, {
			autoLottoTickets: this.autoLottoTickets,
		});
	}

	setLottoResult({winningNumbers, bonusNumber}) {
		if (hasDuplicates([...winningNumbers, bonusNumber])) {
			throw new Error(MESSAGES.HAS_DUPLICATES_IN_WINNING_NUMBERS_ALERT);
		}

		this.lottoResult = new LottoResult({
			winningNumbers,
			bonusNumber,
		});

		eventBus.emit(EVENT.SUBMIT_WINNING_NUMBERS, this.lottoResult);
	}

	generateRandomLotto() {
		return new LottoTicket(this.getRandomLottoNumbers(LOTTO_COUNT));
	}

	getRandomLottoNumbers(count) {
		const balls = new Set(this.lottoNumbers);

		return [...range(count)].map(() => {
			const picked = randomItem([...balls]);

			balls.delete(picked);

			return picked;
		});
	}
}

export default new LottoService();
