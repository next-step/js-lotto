beforeEach(() => {
	cy.visit('/');
});

describe('구입 금액 입력 폼', () => {
	it('구입 금액 입력 폼이 표시된다.', () => {
		cy.get('form[name="purchaseForm"]').should('be.visible');
		cy.get('input[name="purchaseAmountInput"]').should('be.visible');
	});

	it('1000원 단위가 아닌 금액을 제출하면, 얼럿 메시지를 표시한다.', () => {
		const stub = cy.stub();

		cy.on('window:alert', stub);

		cy.purchaseLotto(1999).then(() => {
			expect(stub.getCall(0)).to.be.calledWith(
				'로또 구입 금액을 1,000원 단위로 입력해 주세요.',
			);
		});
	});

	it('1000원 미만의 금액을 제출하면, 유효성 검사 메시지를 표시한다.', () => {
		cy.purchaseLotto(999)
			.get('input[name="purchaseAmountInput"]')
			.then(($input) => {
				expect($input[0].validationMessage).to.eq(
					'Value must be greater than or equal to 1000.',
				);
			});
	});
});

describe('구입한 로또 번호 섹션', () => {
	beforeEach(() => {
		cy.purchaseLotto(5000);
	});

	it('1000원 단위의 금액을 제출하면, 금액에 해당하는 로또 갯수가 표시된다.', () => {
		cy.get('.purchasedCountsLabel').should(
			'have.text',
			'총 5개를 구매하였습니다.',
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

		cy.get('.lottoDetail').each(($element) => {
			const lottoNumbers =
				$element[0].textContent.split(', ').map(Number) ?? [];

			for (const lottoNumber of lottoNumbers) {
				expect(lottoNumber).to.be.greaterThan(0);
				expect(lottoNumber).to.be.lessThan(46);
			}
		});
	});

	it('로또 번호는 6개의 숫자이다.', () => {
		cy.toggleShowLottoNumbers();

		cy.get('.lottoDetail').each(($element) => {
			const lottoNumbers =
				$element[0].textContent.split(', ').map(Number) ?? [];

			expect(lottoNumbers).to.have.lengthOf(6);
		});
	});

	it('로또 번호는 서로 중복하지 않는다.', () => {
		cy.toggleShowLottoNumbers();

		cy.get('.lottoDetail').each(($element) => {
			const lottoNumbers =
				$element[0].textContent.split(', ').map(Number) ?? [];

			expect(lottoNumbers.length).to.be.equal(new Set(lottoNumbers).size);
		});
	});
});

describe('당첨 번호 입력 폼', () => {
	beforeEach(() => {
		cy.purchaseLotto(5000);
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
	it('당첨 번호를 제출하면, 당첨 결과 모달이 표시된다.', () => {});
	it('구입한 로또 번호의 일치 갯수대로 당첨 갯수의 표시된다.', () => {});
	it('수익률은 구입 금액 대비 당첨금으로 표시된다.', () => {});
	it('모달의 닫기 버튼을 클릭하면 모달 요소가 제거된다.', () => {});
	it('모달의 바깥을 클릭하면 모달 요소가 제거된다.', () => {});
	it('다시 시작하기 버튼을 누르면, 초기화된다.', () => {});
});

describe('수동 구매', () => {
	it('수동 구매 갯수 입력이 구입 금액으로 구입 가능한 갯수보다 크면, 얼럿 메시지를 표시한다.', () => {});
	it('수동 로또 번호를 제출할 때, 1미만이거나 45를 초과하는 입력이 있으면, 해당 입력에 유효성 검사 메시지를 표시한다.', () => {});
	it('수동 로또 번호를 제출할 때, 번호에 중복이 있으면, 얼럿 메시지를 표시한다.', () => {});
	it('수동 로또 번호를 제출할 때, 미입력된 입력이 있으면, 유효성 검사 메시지를 표시한다.', () => {});
	it('수동 구매한 금액을 제외한 금액에 해당하는 로또 갯수가 표시된다.', () => {});
});
