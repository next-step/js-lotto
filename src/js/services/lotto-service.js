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

const MESSAGES = {
	NON_UNIT_VALUE_ALERT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
	MANUAL_LOTTO_COUNT_ALERT:
		'수동 구매 갯수가 구입 금액으로 구입 가능한 갯수보다 큽니다.',
	HAS_DUPLICATES_IN_WINNING_NUMBERS_ALERT:
		'로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};

export class LottoService {
	constructor() {
		this.lottoNumbers = [
			...range(LottoService.minimumLottoValue, LottoService.maximumLottoValue),
		];
		this.autoLottoTickets = [];
		this.lottoResult = undefined;
	}

	static lottoPrice = 1000;
	static lottoCount = 6;
	static minimumLottoValue = 1;
	static maximumLottoValue = 45;

	purchaseLotto({purchaseAmount}) {
		const [totalLottoCount, remainder] = divmod(
			purchaseAmount,
			LottoService.lottoPrice,
		);
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
		return new LottoTicket(this.getRandomLottoNumbers(LottoService.lottoCount));
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
