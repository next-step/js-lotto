import { getRandom } from "../../src/js/utils/util";

const $purchaseInput = '[data-cy="purchase-amount"]';
const $purchaseLotto = '.purchased-lotto';

const $lottoStats = '.lotto-stats';
const $lastBonusNumbers = '.bonus-number';

const $modal = '.modal';
const $modalCloseButton = '.modal-close';
const $modalResetButton = '.stats-reset-button';

const priceLotto = 2000;

describe('로또 구현 테스트 :: 모달', () => {
    beforeEach('로또 페이지 방문', () => {
        cy.visit('/');
    })

    beforeEach('로또 구입', () => {
        cy.typePurchaseInput(priceLotto).type('{enter}');
    })

    beforeEach('지난 주 로또 번호와 보너스번호 입력 후 결과 확인하기 버튼 클릭', () => {
        const numbers = getRandoms(7, 1, 45);
        const bonusNumber = numbers.pop();

        cy.typeLastLottoNumbers(numbers);
        cy.get($lastBonusNumbers).type(bonusNumber);

        cy.clickOpenResultModal();
    })

    modalSpec();
})

function modalSpec() {
    it('우측 상단 x 버튼을 누르면 모달이 닫힌다.', () => {
        cy.get($modalCloseButton).click();
        cy.get($modal).should('be.hidden');
    })

    it('다시 시작하기 버튼을 누르면 처음화면으로 돌아간다.', () => {
        cy.get($modalResetButton).click();
        cy.get($modal).should('be.hidden');
        cy.get($purchaseLotto).should('be.hidden');
        cy.get($lottoStats).should('be.hidden');
        cy.get($purchaseInput).should('not.have.value');
    })
}

const getRandoms = (length, min, max) => {
    const numbers = new Set();
    while (numbers.size < length) {
        numbers.add(getRandom(min, max));
    }

    return [...numbers];
}