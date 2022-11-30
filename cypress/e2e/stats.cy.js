import { faker } from '@faker-js/faker';

import { ERROR_MESSAGE } from "../../src/js/utils/const.js";
import { getRandom } from "../../src/js/utils/util.js";
const $lastLottoNumbers = '.winning-number';
const $lastBonusNumbers = '.bonus-number';
const $modal = '.modal';
const cypressPluginTab = require('cypress-plugin-tab');

describe('로또 구현 테스트 :: 지난주 로또 번호 입력', () => {
    beforeEach('로또 페이지 방문', () => {
        cy.visit('/');
    })

    beforeEach('로또 구입', () => {
        cy.typePurchaseInput('3000').type('{enter}');
    })

    statsSpec();
})

function statsSpec() {
    it('지난 주 로또번호와 보너스 번호를 입력할 수 있다.', () => {
        const numbers = faker.random.numeric(7, { bannedDigits: ['0'] }).split('');
        const bonusNumber = numbers.pop();

        cy.typeLastLottoNumbers(numbers);
        numbers.forEach((num, i) => {
            cy.get($lastLottoNumbers).eq(i).should('have.value', num);
        });

        cy.typeLastLottoBonusNumbers(bonusNumber);
        cy.get($lastBonusNumbers).should('have.value', bonusNumber);
    })

    it('지난 주 로또번호와 보너스 번호를 모두 입력해야 한다.', () => {
        const numbers = faker.random.numeric(5, { bannedDigits: ['0'] }).split('');
        cy.typeLastLottoNumbers(numbers);
        checkAlert(cy.clickOpenResultModal(), ERROR_MESSAGE.StatsNumbersRequired);
    })

    it('지난 주 로또번호와 보너스 번호는 중복될 수 없다.', () => {
        const numbers = [1, 14, 12, 31, 21, 1];
        cy.typeLastLottoNumbers(numbers);
        cy.typeLastLottoBonusNumbers(1);
        checkAlert(cy.clickOpenResultModal(), ERROR_MESSAGE.NotAllowedDuplicatedValue);
    })

    it('지난 주 로또번호와 보너스 번호는 1 ~ 45 사이의 숫자여야 한다. :: 범위 밖의 값', () => {
        const numbers = getRandoms(7, 0, 99);
        const bonusNumber = numbers.pop();

        cy.typeLastLottoNumbers(numbers);
        cy.get($lastBonusNumbers).type(bonusNumber);

        checkAlert(cy.clickOpenResultModal(), ERROR_MESSAGE.OutOfNumberRange);
    })

    it('지난 주 로또번호와 보너스 번호에 1 ~ 45 사이의 숫자를 입력한 후 결과 확인하기 버튼을 누르면 모달이 뜬다.', () => {
        const numbers = getRandoms(7, 1, 45);
        const bonusNumber = numbers.pop();

        cy.typeLastLottoNumbers(numbers);
        cy.get($lastBonusNumbers).type(bonusNumber);

        cy.clickOpenResultModal();
        cy.get($modal).should('be.visible');
    })
}

const getRandoms = (length, min, max) => {
    const numbers = new Set();
    while (numbers.size < length) {
        numbers.add(getRandom(min, max));
    }

    return [...numbers];
}

function checkAlert(scenario, message) {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    scenario.then(() => expect(stub.getCall(0).lastArg).to.equals(message));
}
