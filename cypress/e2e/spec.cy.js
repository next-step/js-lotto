import { LOTTO_UNIT } from '../../src/js/constants.js';

const priceInputAndClick = (price) =>
  cy.get('input[name="purchasePrice"]').type(price, { force: true }).get('#purchaseForm > .d-flex > .btn').click();
const onOccurAlert = (text) => cy.on('window:alert', (alert) => expect(alert).to.contains(text));

describe('Lotto 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('input에 구입금액을 입력하고 확인버튼을 누른 경우', () => {
    it(`value값이 ${LOTTO_UNIT}원으로 나누어떨어지지 않는다면 경고를표시하고 초기화한다.`, () => {
      priceInputAndClick(1350);
      onOccurAlert(`로또 구입 금액을 ${LOTTO_UNIT}원 단위로 입력해 주세요.`);
      cy.get('.mr-2').should('have.value', '');
    });
    describe(`value값이 ${LOTTO_UNIT}원으로 나누어떨어진다면`, () => {
      it(`value값이 반환된다.`, () => {
        priceInputAndClick(5000);
        cy.get('.mr-2').should('have.value', '5000');
      });
    });
  });

  describe('로또 구매시', () => {
    it(`로또 구매 금액에 따른 section을 볼 수 있어야한다.`, () => {
      priceInputAndClick(3000);
      cy.get('#purchaseSection').should('have.class', 'is-active');
      cy.get('#purchaseSection').should('be.visible');
    });
    it(`로또 1장의 가격은 ${LOTTO_UNIT}원 이고 3000원 구매시 3개가 구매된다.`, () => {
      priceInputAndClick(3000);
      cy.get('.my-0').contains(`총 3개를 구매하였습니다.`);
    });
    it(`소비자는 자동 구매를 할 수 있어야 한다.`, () => {
      priceInputAndClick(3000);
      cy.get('#lotto-icons>.lotto-wrapper').should('have.length', 3);
      cy.get('#lotto-icons>.lotto-wrapper>.lotto-icon').should('have.length', 3);
      cy.get('#lotto-icons>.lotto-wrapper>.lotto-detail').should('have.length', 3);
    });
    it('하나의 로또의 번호의 갯수는 6개 이다.', () => {
      priceInputAndClick(3000);
      cy.get('.lotto-detail').each((elem) => {
        const lottoNumbers = elem
          .text()
          .split(', ')
          .map((text) => parseInt(text, 10));
        expect(lottoNumbers).to.have.lengthOf(6);
      });
    });
    it('로또 숫자는 1이상 45이하의 숫자이다.', () => {
      priceInputAndClick(3000);
      cy.get('.lotto-detail').each((elem) => {
        const lottoNumbers = elem
          .text()
          .split(', ')
          .map((text) => parseInt(text, 10));
        lottoNumbers.forEach((number) => {
          expect(number).to.above(0);
          expect(number).to.below(46);
        });
      });
    });
    it('로또 하나의 숫자들은 중복되지 않는다.', () => {
      priceInputAndClick(3000);
      cy.get('.lotto-detail').each((elem) => {
        const lottoNumbers = elem
          .text()
          .split(', ')
          .map((text) => parseInt(text, 10));
        const noOverlapNumber = new Set();
        for (let i = 0; i < lottoNumbers.length; i++) {
          if (lottoNumbers.includes(lottoNumbers[i])) {
            noOverlapNumber.add(lottoNumbers[i]);
          }
        }
        expect(noOverlapNumber.size).to.equal(6);
      });
    });
  });

  describe('번호보기 버튼 클릭시', () => {
    it('랜덤으로 생성된 로또번호를 볼 수 있어야 한다.', () => {
      priceInputAndClick(3000);
      cy.get('.text-base').click();
      cy.get('.lotto-numbers-toggle-button').should('be.checked');
      cy.get('.lotto-detail').should('be.visible');
    });
    it('로또번호가 보여지고 있다면 숨겨져야한다.', () => {
      priceInputAndClick(3000);
      cy.get('.text-base').click();
      cy.get('.text-base').click();
      cy.get('.lotto-numbers-toggle-button').should('not.be.checked');
      cy.get('.lotto-detail').should('not.be.visible');
    });
  });
});
