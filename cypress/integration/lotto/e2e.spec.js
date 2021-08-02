/// <reference types="cypress" />
import CONSTANTS from '../../../src/js/constants.js';
describe('로또 e2e', () => {
	beforeEach(() => {
		cy.visit('https://next-step.github.io/js-lotto/');
	});
	context('구입 금액 입력', () => {
		it('1000원을 입력 후 엔터를 누르면 티켓 한 장이 나타난다.', () => {
			purchaseInput().type('1000{enter}');
			tickets().should('have.length', 1);
			ticketsSwitch().should('not.be.checked');
		});
		it('1000원을 입력 후 확인버튼을 누르면 티켓 한 장이 나타난다.', () => {
			purchaseInput().type('1000');
			purchaseBTN().click();
			tickets().should('have.length', 1);
		});
		// 이후 확인버튼 클릭과 엔터는 동일한 커멘드라 간주
		context('예외적인 입력 처리들', () => {
			it('아무 값 입력 없이 확인버튼을 누르면 입력란을 작성하라는 메시지가 보인다.', () => {
				purchaseBTN().click();
				purchaseInput().shouldEmptyMessage();
			});
			context('1000이하 입력값들', () => {
				[-1, 0, 10, 50, 999].forEach((purchaseInputValue) => {
					it(`${purchaseInputValue} 입력 후 확인버튼을 누르면 1000이상 입력하라는 메시지가 나온다.`, () => {
						purchaseInput().type(`${purchaseInputValue}`);
						purchaseBTN().click();
						purchaseInput().shouldPurchaseMinMessage();
					});
				});
			});
			context('100000이상 입력값들', () => {
				[100001, 200000, 999999].forEach((purchaseInputValue) => {
					it(`${purchaseInputValue} 입력 후 확인버튼을 누르면 1000000이하 입력하라는 메시지가 나온다.`, () => {
						purchaseInput().type(`${purchaseInputValue}`);
						purchaseBTN().click();
						purchaseInput().shouldPurchaseMaxMessage();
					});
				});
			});
			context('1000이상 100000이하면서 1000의 배수가 아닌 입력값들', () => {
				[9999, 10002, 96969].forEach((purchaseInputValue) => {
					it(`${purchaseInputValue} 입력 후 확인버튼을 누르면 1000단위로 입력하라는 알림창이 뜬다.`, () => {
						const alertStub = alertStubFn();
						purchaseInput().type(`${purchaseInputValue}`);
						purchaseBTN()
							.click()
							.then(shouldCallInvalidAmountOfPurchaseInputAlert(alertStub));
					});
				});
			});
		});
	});

	context('tickets test', () => {
		it(`5000을 입력하면 티켓은 5개가 나타난다.`, () => {
			purchaseInput().type(`${5000}{enter}`);
			tickets().should('have.length', 5);

			ticketsSwitch().should('not.be.checked');
		});

		it(`10000을 입력하면 티켓은 5개가 나타난다.`, () => {
			purchaseInput().type(`${10000}{enter}`);
			tickets().should('have.length', 10);

			ticketsSwitch().should('not.be.checked');
		});

		it('티켓을 구매 후 로또 번호가 보이지 않는다.', () => {
			purchaseInput().type('1000{enter}');

			lottoDetails().each(($lottoDetail) =>
				cy.wrap($lottoDetail).should('not.be.visible')
			);
		});
		it('티켓을 구매 후 번호보기 스위치를 클릭하면 로또 번호가 보인다.', () => {
			purchaseInput().type('5000{enter}');
			clickTicketSwitch();
			lottoDetails().each(($lottoDetail) =>
				cy
					.wrap($lottoDetail)
					.should('be.visible')
					.shouldHaveSixNumbersAndEachGteOneAndLteFourtyFive()
			);
		});
	});
	context('당첨번호 입력 테스트', () => {
		beforeEach(() => {
			purchaseInput().type('5000{enter}');
		});
		// 하드코딩하면 그만큼 가독성은 향상되지만, 유지보수에 있어서 이점을 가지기 힘들다.
		context('입력 에러 상황들', () => {
			context('0 이하 입력하면 1이상 입력하라는 메시지가 나타난다.', () => {
				it('첫번째 입력란에 -1입력하면 ', () => {
					firstWinnngNumberInput().type('-1').shouldLottosMinMessage();
				});
				it('두번째 입력란에 -1입력하면 ', () => {
					secondWinnngNumberInput().type('-1').shouldLottosMinMessage();
				});
				it('세번째 입력란에 -1입력하면 ', () => {
					thirdWinnngNumberInput().type('-1').shouldLottosMinMessage();
				});
				it('네번째 입력란에 -1입력하면 ', () => {
					fourthWinnngNumberInput().type('-1').shouldLottosMinMessage();
				});
				it('다섯번째 입력란에 -1입력하면 ', () => {
					fifthWinnngNumberInput().type('-1').shouldLottosMinMessage();
				});
				it('여섯번째 입력란에 -1입력하면 ', () => {
					sixthWinnngNumberInput().type('-1').shouldLottosMinMessage();
				});
				it('보너스 입력란에 -1입력하면 ', () => {
					bonusWinnngNumberInput().type('-1').shouldLottosMinMessage();
				});
			});
			context('46 이상 입력하면 1이상 입력하라는 메시지가 나타난다.', () => {
				it('첫번째 입력란에 46입력하면 ', () => {
					firstWinnngNumberInput().type('46').shouldLottosMaxMessage();
				});
				it('두번째 입력란에 47입력하면 ', () => {
					secondWinnngNumberInput().type('47').shouldLottosMaxMessage();
				});
				it('세번째 입력란에 48입력하면 ', () => {
					thirdWinnngNumberInput().type('48').shouldLottosMaxMessage();
				});
				it('네번째 입력란에 49입력하면 ', () => {
					fourthWinnngNumberInput().type('49').shouldLottosMaxMessage();
				});
				it('다섯번째 입력란에 50입력하면 ', () => {
					fifthWinnngNumberInput().type('50').shouldLottosMaxMessage();
				});
				it('여섯번째 입력란에 51입력하면 ', () => {
					sixthWinnngNumberInput().type('51').shouldLottosMaxMessage();
				});
				it('보너스 입력란에 52입력하면 ', () => {
					bonusWinnngNumberInput().type('52').shouldLottosMaxMessage();
				});
			});
			it('7 칸 모두 입력하면서 중복된 숫자가 있을 경우 중복된 숫자를 입력할 수 없다는 알림이 나타난다.', () => {
				const alertStub = alertStubFn();

				inputsWinningNumnersAs([1, 2, 3, 4, 5, 6, 1]);

				resultCheckButton()
					.click()
					.then(shouldCalledDuplicatedLottosNumberAlert(alertStub));
			});
		});
	});
	// 랜덤값에 대한 테스트는 유닛테스트로 대체
	context('결과확인 모달 테스트', () => {
		beforeEach(() => {
			purchaseInput().type('5000{enter}');
			inputsWinningNumnersAs([1, 2, 3, 4, 5, 6, 7]);
			resultCheckButton().click();
		});
		it('당첨 통계 타이틀이 존재하는 모달창이 나타난다.', () => {
			cy.findByText(CONSTANTS.TEXT_COMPONENTS.RESULT_MODAL.TITLE).should(
				'exist'
			);
		});
		it('다시시작하기 버튼을 누르면 모든 정보가 리셋된다.', () => {
			cy.get('#reset-btn').click();
			purchaseInput().should('not.have.value');
			ticketsSwitch().should('not.be.visible');
			tickets().should('not.be.visible');
		});
	});
});

//문제 : context에서 설명하는 내용과 테스트 코드가 자동으로 싱크를 맞출 수 없다. 임의로 수정해야한다.
function purchaseInput() {
	return cy.findByPlaceholderText(
		CONSTANTS.TEXT_COMPONENTS.PURCHASE.INPUT_PLACEHOLDER
	);
}
function resultCheckButton() {
	return cy.findByRole('button', {
		name: CONSTANTS.TEXT_COMPONENTS.RESULT_BUTTON.LABEL,
	});
}
function inputsWinningNumnersAs(numArr) {
	const winningNumberInputFuntions = [
		firstWinnngNumberInput,
		secondWinnngNumberInput,
		thirdWinnngNumberInput,
		fourthWinnngNumberInput,
		fifthWinnngNumberInput,
		sixthWinnngNumberInput,
		bonusWinnngNumberInput,
	];
	winningNumberInputFuntions.forEach(
		(fn, index) => numArr[index] !== null && fn().type(`${numArr[index]}`)
	);
}

function _getByAriaLabel(value) {
	return cy.get(`[aria-label="winning-number-${value}"`);
}
function firstWinnngNumberInput() {
	return _getByAriaLabel('1');
}
function secondWinnngNumberInput() {
	return _getByAriaLabel('2');
}
function thirdWinnngNumberInput() {
	return _getByAriaLabel('3');
}
function fourthWinnngNumberInput() {
	return _getByAriaLabel('4');
}
function fifthWinnngNumberInput() {
	return _getByAriaLabel('5');
}
function sixthWinnngNumberInput() {
	return _getByAriaLabel('6');
}
function bonusWinnngNumberInput() {
	return _getByAriaLabel('bounus');
}

function lottoDetails() {
	return cy.get('.lotto-detail');
}
function purchaseBTN() {
	return cy.findByRole('button', {
		name: CONSTANTS.TEXT_COMPONENTS.PURCHASE.BUTTON_LABEL,
	});
}
function tickets() {
	return cy.findAllByText(CONSTANTS.TEXT_COMPONENTS.TICKETS.TICKET_TEXT);
}

function ticketsSwitch() {
	return cy.findByLabelText(CONSTANTS.TEXT_COMPONENTS.TICKETS.SWITCH_LABEL);
}

function clickTicketSwitch() {
	return cy.findByText(CONSTANTS.TEXT_COMPONENTS.TICKETS.SWITCH_LABEL).click();
}

// alert actions
function alertStubFn() {
	const stub = cy.stub();
	cy.on('window:alert', stub);
	return stub;
}
function shouldCallInvalidAmountOfPurchaseInputAlert(alertStub) {
	return () =>
		expect(alertStub).to.be.calledWith(
			CONSTANTS.MESSAGES.PURCHASE.INVALID_AMOUNT_UNIT_INPUT
		);
}
function shouldCalledDuplicatedLottosNumberAlert(alertStub) {
	return () =>
		expect(alertStub).to.be.calledWith(CONSTANTS.MESSAGES.LOTTOS.DUPLICATED);
}
