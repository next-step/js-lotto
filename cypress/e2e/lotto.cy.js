describe('로또 사이트 E2E 테스트', () => {
  let $lottoInput = '[data-id=lotto-number-input]';
  let $lottoButton = '[data-id=lotto-submit-button]';
  let $resultSpan = '[data-id=result-text]';
  let $numberToggleButton = '[data-id=number-toggle-button]';
  beforeEach(() => {
    cy.visit('../../index.html');
    cy.contains('h1', '🎱 행운의 로또');
  });

  describe('로또 1장의 가격은 1,000원이다.', () => {
    it('구입금액을 입력할 Input이 존재해야한다.', () => {
      cy.get($lottoInput).should('exist');
    });

    it('1000원 단위로 입력하지 않고 제출하는 경우 경고창을 띄우고 입력값을 리셋시킨다.', () => {
      const TYPE = ['1001, 2001, 01121'];
      TYPE.forEach((eachTyping) => {
        cy.get($lottoInput).type(eachTyping);
        cy.get($lottoButton).click();

        cy.on('window:alert', (text) => {
          expect(text).to.contains(
            '로또 구입 금액을 1,000원 단위로 입력해 주세요.'
          );
        });
        cy.get($lottoInput).should('have.text', '');
      });
    });
    it('숫자를 제외한 값을 입력하여도 숫자를 제외한 것은 화면에 렌더링 되지 않아야한다', () => {
      const [TYPE, RESULT] = [
        ['1000!', '@1', '!'],
        ['1000', '1', ''],
      ];

      TYPE.forEach((eachTyping) => {
        cy.get($lottoInput).type(eachTyping);
        cy.get($lottoInput).should('have.text', RESULT);
      });
    });
  });

  context('소비자는 자동 구매를 할 수 있어야 한다.', () => {
    it('확인(제출)버튼이 존재해야한다', () => {
      cy.get($lottoButton).should('exist');
    });
    it('확인(제출)버튼 클릭 시 구매한 갯수를 알려주는 문자가 렌더되어야 한다.', () => {
      const [TYPE, RESULT] = ['5000', '총 5개를 구매하였습니다.'];
      cy.get($lottoInput).type(TYPE);
      cy.get($lottoButton).click();
      cy.get($resultSpan).should('have.text', RESULT);
    });
    it('확인(제출)버튼 클릭 시 번호보기 버튼이 렌더되어야 한다.', () => {
      const [TYPE, RESULT] = ['5000', '총 5개를 구매하였습니다.'];
      cy.get($lottoInput).type(TYPE);
      cy.get($lottoButton).click();
      cy.get($resultSpan).should('have.text', RESULT);
      cy.get($numberToggleButton).should('exist');
    });
  });

  context(
    '로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.',
    () => {
      it('금액만큼(1000원당 1개)의 로또 이미지가 생성되어야 한다.', () => {});
      it('금액만큼(1000원당 1개)의 난수 집합이 생성되어야 한다.', () => {});
      it('금액만큼(1000원당 1개)의 난수 집합이 생성된 뒤 화면에서 숨겨져 있어야한다', () => {});
    }
  );

  context(
    '복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.',
    () => {
      it('토글버튼이 비활성화 상태일 때 복권의 번호가 보이지 않아야 한다.', () => {});
      it('토글버튼이 활성화 상태일 때 복권의 번호가 보여야 한다.', () => {});
    }
  );
});
