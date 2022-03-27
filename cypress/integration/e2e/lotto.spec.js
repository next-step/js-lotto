import LottoTicket from '../../../src/js/model/lotto-ticket.js';
import {
	LOTTO_PRICE,
	MAXIMUM_LOTTO_VALUE,
	MINIMUM_LOTTO_VALUE,
} from '../../../src/js/services/lotto-service.js';

beforeEach(() => {
	cy.visit('/');
});

describe('구입 금액 입력 폼', () => {
	it('구입 금액 입력 폼이 표시된다.', () => {
		cy.get('form[name="purchaseForm"]').should('be.visible');
		cy.get('input[name="purchaseAmountInput"]').should('be.visible');
	});

	it('금액을 입력하지 않고 제출하면, 유효성 검사 메시지를 표시한다.', () => {
		cy.purchaseLotto().then(() => {
			cy.get('input[name="purchaseAmountInput"]').then(($inputs) => {
				expect($inputs[0].validationMessage).to.eq(
					'Please fill out this field.',
				);
			});
		});
	});

	it('1000원 단위가 아닌 금액을 제출하면, 얼럿 메시지를 표시한다.', () => {
		const stub = cy.stub();

		cy.on('window:alert', stub);

		cy.purchaseLotto({purchaseAmount: 2 * LOTTO_PRICE - 1}).then(() => {
			expect(stub.getCall(0)).to.be.calledWith(
				'로또 구입 금액을 1,000원 단위로 입력해 주세요.',
			);
		});
	});

	it('1000원 미만의 금액을 제출하면, 유효성 검사 메시지를 표시한다.', () => {
		cy.purchaseLotto({purchaseAmount: LOTTO_PRICE - 1})
			.get('input[name="purchaseAmountInput"]')
			.then(($inputs) => {
				expect($inputs[0].validationMessage).to.eq(
					'Value must be greater than or equal to 1000.',
				);
			});
	});
});

describe('구입한 로또 번호 섹션', () => {
	beforeEach(() => {
		cy.purchaseLotto({purchaseAmount: 5 * LOTTO_PRICE});
	});

	it('1000원 단위의 금액을 제출하면, 금액에 해당하는 로또 갯수가 표시된다.', () => {
		cy.get('.purchasedCountLabel').should(
			'have.text',
			'총 5개를 자동 구매하였습니다.',
		);
		cy.get('.autoPurchasedLottoList').children().should('have.length', 5);
	});

	it('번호보기 토글이 켜져 있으면, 로또 번호가 표시된다.', () => {
		cy.toggleShowLottoNumbers();

		cy.get('input[name="showLottoNumbersToggle"]')
			.should('be.checked')
			.then(() => {
				cy.get('.lottoDetail').should('be.visible');
			});
	});

	it('번호보기 토글이 꺼져 있으면, 로또 번호가 표시되지 않는다.', () => {
		cy.get('input[name="showLottoNumbersToggle"]')
			.should('not.be.checked')
			.then(() => {
				cy.get('.lottoDetail').should('not.be.visible');
			});
	});

	it('로또 번호는 모두 1이상 45이하의 숫자이다.', () => {
		cy.toggleShowLottoNumbers();

		cy.get('.lottoDetail').each(($elements) => {
			const lottoNumbers =
				$elements[0].textContent.split(', ').map(Number) ?? [];

			for (const lottoNumber of lottoNumbers) {
				expect(lottoNumber).to.be.greaterThan(MINIMUM_LOTTO_VALUE);
				expect(lottoNumber).to.be.lessThan(MAXIMUM_LOTTO_VALUE + 1);
			}
		});
	});

	it('로또 번호는 6개의 숫자이다.', () => {
		cy.toggleShowLottoNumbers();

		cy.get('.lottoDetail').each(($elements) => {
			const lottoNumbers =
				$elements[0].textContent.split(', ').map(Number) ?? [];

			expect(lottoNumbers).to.have.lengthOf(6);
		});
	});

	it('로또 번호는 서로 중복하지 않는다.', () => {
		cy.toggleShowLottoNumbers();

		cy.get('.lottoDetail').each(($elements) => {
			const lottoNumbers =
				$elements[0].textContent.split(', ').map(Number) ?? [];

			expect(lottoNumbers.length).to.be.equal(new Set(lottoNumbers).size);
		});
	});
});

describe('당첨 번호 입력 폼', () => {
	beforeEach(() => {
		cy.purchaseLotto({purchaseAmount: 5 * LOTTO_PRICE});
	});

	it('1000원 단위의 금액을 제출하면, 지난 당첨 번호 입력 폼이 표시된다.', () => {
		cy.get('form[name=inputWinningNumbersForm]').should('be.visible');
	});

	it('당첨 번호를 제출할 때, 1미만이거나 45를 초과하는 입력이 있으면, 해당 입력에 유효성 검사 메시지를 표시한다.', () => {
		cy.submitWinningNumbers([1, -10, 3, 4, 5, 6, 7]);
		cy.get('form[name=inputWinningNumbersForm]').within(() => {
			cy.get('input').then(($inputs) => {
				expect($inputs[1].validationMessage).to.eq(
					'Value must be greater than or equal to 1.',
				);
			});
		});

		cy.submitWinningNumbers([1, 48, 3, 4, 5, 6, 7]);
		cy.get('form[name=inputWinningNumbersForm]').within(() => {
			cy.get('input').then(($inputs) => {
				expect($inputs[1].validationMessage).to.eq(
					'Value must be less than or equal to 45.',
				);
			});
		});
	});

	it('당첨 번호를 제출할 때, 번호에 중복이 있으면, 얼럿 메시지를 표시한다.', () => {
		const stub = cy.stub();

		cy.on('window:alert', stub);

		cy.submitWinningNumbers([1, 2, 3, 4, 5, 6, 6]).then(() => {
			expect(stub.getCall(0)).to.be.calledWith(
				'로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
			);
		});
	});

	it('당첨 번호를 제출할 때, 미입력된 입력이 있으면, 유효성 검사 메시지를 표시한다.', () => {
		cy.submitWinningNumbers([1, 2, 3, 4, 5, 6]);
		cy.get('form[name=inputWinningNumbersForm]').within(() => {
			cy.get('input').then(($inputs) => {
				expect($inputs[6].validationMessage).to.eq(
					'Please fill out this field.',
				);
			});
		});
	});
});

describe('당첨 결과 모달', () => {
	it('당첨 번호를 제출하면, 당첨 결과 모달이 표시된다.', () => {
		cy.purchaseLotto({purchaseAmount: 5 * LOTTO_PRICE});
		cy.submitWinningNumbers([1, 2, 3, 4, 5, 6, 7]);

		cy.get('.winningResultModal').should('be.visible');
	});

	it('구입한 로또 번호의 일치 갯수대로 당첨 갯수에 표시된다.', () => {
		cy.document().then(($document) => {
			$document.dispatchEvent(
				new CustomEvent('PURCHASE_LOTTO', {
					detail: {
						autoLottoTickets: [
							LottoTicket.create([1, 2, 11, 8, 9, 10]), // 2개
							LottoTicket.create([1, 2, 3, 7, 8, 9]), // 3개
							LottoTicket.create([1, 2, 3, 4, 7, 8]), // 4개
							LottoTicket.create([1, 2, 3, 4, 5, 8]), // 5개
							LottoTicket.create([1, 2, 3, 4, 5, 7]), // 5개 + 보너스
							LottoTicket.create([1, 2, 3, 4, 5, 6]), // 6개
						],
					},
				}),
			);
		});

		cy.submitWinningNumbers([1, 2, 3, 4, 5, 6, 7]);

		cy.get('.resultTableBody > .text-center').each(($elements) => {
			expect($elements[0].lastElementChild.textContent).to.be.equal('1개');
		});
	});

	it('수익률은 구입 금액 대비 당첨금으로 표시된다.', () => {
		cy.document().then(($document) => {
			$document.dispatchEvent(
				new CustomEvent('PURCHASE_LOTTO', {
					detail: {
						autoLottoTickets: [
							LottoTicket.create([1, 2, 8, 9, 10, 11]), // 2개
							LottoTicket.create([1, 2, 3, 7, 8, 9]), // 3개
							LottoTicket.create([1, 2, 3, 4, 7, 8]), // 4개
							LottoTicket.create([1, 2, 3, 4, 5, 8]), // 5개
							LottoTicket.create([1, 2, 3, 4, 5, 7]), // 5개 + 보너스
							LottoTicket.create([1, 2, 3, 4, 5, 6]), // 6개
						],
					},
				}),
			);
		});

		cy.submitWinningNumbers([1, 2, 3, 4, 5, 6, 7]);

		cy.get('.earningRate').should(
			'have.text',
			`당신의 총 수익률은 ${
				((2_000_000_000 + 5000 + 50_000 + 1_500_000 + 30_000_000) / 6000) * 100
			}%입니다.`,
		);
	});

	it('모달의 닫기 버튼을 클릭하면 모달 요소가 제거된다.', () => {
		cy.purchaseLotto({purchaseAmount: 5 * LOTTO_PRICE});
		cy.submitWinningNumbers([1, 2, 3, 4, 5, 6, 7]);

		cy.get('.winningResultModal > .modal-inner > .modal-close')
			.should('be.visible')
			.click()
			.should('be.not.visible');
	});

	it('모달의 바깥을 클릭하면 모달 요소가 제거된다.', () => {
		cy.purchaseLotto({purchaseAmount: 5 * LOTTO_PRICE});
		cy.submitWinningNumbers([1, 2, 3, 4, 5, 6, 7]);

		cy.get('.winningResultModal')
			.should('be.visible')
			.click(1, 1)
			.should('be.not.visible');
	});

	it('다시 시작하기 버튼을 누르면, 초기화된다.', () => {
		cy.purchaseLotto({purchaseAmount: 5 * LOTTO_PRICE});
		cy.submitWinningNumbers([1, 2, 3, 4, 5, 6, 7]);
		cy.get('.winningResultModal')
			.contains('다시 시작하기')
			.click()
			.then(() => {
				cy.get('form[name="purchaseForm"]').should('be.visible');
				cy.get('input[name="purchaseAmountInput"]').should('be.visible');
				cy.get('#purchasedLottoSection').should('be.not.visible');
				cy.get('form[name="inputWinningNumbersForm"]').should('be.not.visible');
				cy.get('.winningResultModal').should('be.not.visible');
			});
	});
});

describe('수동 구매', () => {
	it('수동 구매 갯수 입력이 구입 금액으로 구입 가능한 갯수보다 크면, 얼럿 메시지를 표시한다.', () => {});
	it('수동 로또 번호를 제출할 때, 1미만이거나 45를 초과하는 입력이 있으면, 해당 입력에 유효성 검사 메시지를 표시한다.', () => {});
	it('수동 로또 번호를 제출할 때, 번호에 중복이 있으면, 얼럿 메시지를 표시한다.', () => {});
	it('수동 로또 번호를 제출할 때, 미입력된 입력이 있으면, 유효성 검사 메시지를 표시한다.', () => {});
	it('수동 구매한 금액을 제외한 금액에 해당하는 로또 갯수가 표시된다.', () => {});
});
