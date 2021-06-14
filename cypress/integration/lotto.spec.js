import { MESSAGE } from '../../src/js/constants/constants.js';

describe('로또', () => {
  it('페이지 방문', () => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });
  context('로또 금액 입력', () => {
    const typePrice = price => {
      return cy.get('.price-input').type(price);
    };
    it('로또 구매의 최소 금액은 1000원 단위', () => {
      typePrice(900);
      cy.get('.price-button').click();
      cy.on('window:alert', message => {
        expect(message).to.equal(MESSAGE.PRICE_HAS_REMAINDER);
      });
    });
    it('로또 9장 구매', () => {
      typePrice(0);
      cy.get('.price-button').click();
    });
  });
  context('로또 디스플레이', () => {
    it('로또 구매 개수는 9개', () => {
      cy.get('.lotto-count').should('contain', 9);
    });
    it('로또 티켓이 구매 개수대로 보여진다', () => {
      cy.get('.lotto-box>div').should('have.length', 9);
    });
    it('토글을 클릭하면 로또에 부여된 6개의 랜덤 숫자가 함께 보여진다', () => {
      cy.get('.lotto-numbers-toggle-button').check({ force: true });
      cy.get('.lotto-box>div')
        .first()
        .children()
        .children()
        .eq(0)
        .invoke('text')
        .then(text => {
          expect(text.split(',').length).to.equal(6);
        });
    });
  });
  context('로또 당첨 번호 입력', () => {
    const addWinningNum = (arr, bonus) => {
      arr.map((num, index) => {
        const winningNumbers = cy.get('.winning-numbers');
        winningNumbers.find(`[data-index="${index}"]`).type(num);
      });
      cy.get('.bonus-number').type(bonus);
    };
    it('45를 초과하는 숫자를 입력하면 오류', () => {
      addWinningNum([1, 2, 3, 4, 5, 6], 46);
      cy.get('.open-result-modal-button').click();
      cy.on('window:alert', message => {
        expect(message).to.equal(MESSAGE.NUMBER_NOT_IN_RANGE);
      });
    });
    it('로또 당첨 번호 입력창이 하나라도 비어있으면 오류', () => {
      cy.get('.bonus-number').clear();
      cy.get('.open-result-modal-button').click();
      cy.on('window:alert', message => {
        expect(message).to.equal(MESSAGE.NUMBER_REQUIRED);
      });
    });
    it('중복된 숫자를 입력했으면 오류', () => {
      cy.get('.bonus-number').type(6);
      cy.get('.open-result-modal-button').click();
      cy.on('window:alert', message => {
        expect(message).to.equal(MESSAGE.NUMBER_CANNOT_BE_DUPLICATED);
      });
    });
  });
  context('로또 결과 모달', () => {
    it('당첨 번호를 바르게 입력했다면, 결과 모달이 떠야한다.', () => {
      cy.get('.bonus-number').clear();
      cy.get('.bonus-number').type(45);
      cy.get('.open-result-modal-button').click();
      cy.get('.modal').should('be.visible');
    });
    it('다시 시작하기 버튼', () => {
      cy.get('.restart-button').click();
    });
    it('빈 로또 금액 입력창', () => {
      cy.get('.price-input').should('have.value', '');
    });
    it('보이지 않는 로또 디스플레이', () => {
      cy.get('.lotto-area').should('not.be.visible');
    });
    it('보이지 않은 로또 당첨 번호 입력창', () => {
      cy.get('.lotto-result-form').should('not.be.visible');
    });
  });
});
