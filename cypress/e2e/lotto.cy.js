describe('로또 사이트 E2E 테스트', () => {
  let $lottoInput = '[data-id=lotto-number-input]';
  let $lottoButton = '[data-id=lotto-submit-button]';
  let $resultSpan = '[data-id=result-text]';
  let $numberToggleButton = '[data-id=number-toggle-button]';
  let $lottoImage = '[data-id=lotto-image]';
  let $lottoNumber = '[data-id=lotto-number]';

  beforeEach(() => {
    cy.visit('../../index.html');
  });

  context('로또는 1장에 1,000원 단위로 구매할 수 있어야한다.', () => {
    it('구입금액을 입력할 Input이 존재해야한다.', () => {
      cy.get($lottoInput).should('exist');
    });

    it('값을 입력하지 않는 경우 제출버튼을 비활성화 한다', () => {
      cy.get($lottoInput).clear();
      cy.get($lottoButton).should('be.disabled');
    });

    it('100,000원이 넘어가는 금액의 경우 100,000원까지만 구매 가능하다고 경고창을 띄워준 뒤 입력값을 리셋시킨다.', () => {
      const purchaseValue = '100001';

      cy.get($lottoInput).type(purchaseValue);
      cy.get($lottoButton).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains('최대 구매가능 금액은 100,000원 입니다.');
      });
      cy.on('window:confirm', () => true);
      cy.get($lottoInput).should('have.value', '');
    });

    it('1000원 단위로 입력하지 않고 제출하는 경우 경고창을 띄우고 입력값을 리셋시킨다.', () => {
      const purchaseValue = '1001';

      cy.get($lottoInput).type(purchaseValue);
      cy.get($lottoButton).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains(
          '로또 구입 금액을 1,000원 단위로 입력해 주세요.'
        );
      });
      cy.on('window:confirm', () => true);
      cy.get($lottoInput).should('have.value', '');
    });

    it('숫자를 제외한 값을 입력하여도 숫자를 제외한 것은 화면에 렌더링 되지 않아야한다', () => {
      const [purchaseValue, expectedResult] = [
        ['1000!', '@1', '!'],
        ['1000', '1', ''],
      ];

      purchaseValue.forEach((eachTyping, index) => {
        cy.get($lottoInput).type(eachTyping);
        cy.get($lottoInput).should('have.value', expectedResult[index]);
        cy.get($lottoInput).clear();
      });
    });
  });

  context('소비자는 자동 구매를 할 수 있어야 한다.', () => {
    const [purchasePrice, result] = ['5000', '총 5개를 구매하였습니다.'];
    const makeResult = (price) => {
      cy.get($lottoInput).type(price);
      cy.get($lottoButton).click();
    };

    const checkText = (expectedResult) => {
      cy.get($resultSpan).should('have.text', expectedResult);
    };

    it('확인(제출)버튼이 존재해야한다', () => {
      cy.get($lottoButton).should('exist');
    });

    it('확인(제출)버튼 클릭 시 구매한 갯수를 알려주는 문자가 렌더되어야 한다.', () => {
      makeResult(purchasePrice);
      checkText(result);
    });

    it('확인(제출)버튼 클릭 시 번호보기 버튼이 렌더되어야 한다.', () => {
      makeResult(purchasePrice);
      checkText(result);
      cy.get($numberToggleButton).should('exist');
    });

    it('엔터키를 누르는 경우 확인버튼 클릭과 동일하게 작동하여야 한다.', () => {
      cy.get($lottoInput).type(purchasePrice).type('{enter}');
      checkText(result);
      cy.get($numberToggleButton).should('exist');
    });
  });

  context(
    '로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.',
    () => {
      const [purchaseValue, imageCount] = ['5000', 5];

      beforeEach(() => {
        cy.get($lottoInput).type(purchaseValue);
        cy.get($lottoButton).click();
      });

      it('금액만큼(1000원당 1개)의 로또 이미지가 생성되어야 한다.', () => {
        cy.get($lottoImage).should('have.length', imageCount);
      });
      it('금액만큼(1000원당 1개)의 난수 집합이 생성되어야 한다.', () => {
        cy.get($lottoNumber).should('have.length', imageCount);
      });
      it('금액만큼(1000원당 1개)의 난수 집합이 생성된 뒤 화면에서 숨겨져 있어야한다', () => {
        cy.get($lottoNumber).should('have.css', 'display', 'none');
      });
    }
  );

  context(
    '복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.',
    () => {
      const purchaseValue = '5000';

      beforeEach(() => {
        cy.get($lottoInput).type(purchaseValue);
        cy.get($lottoButton).click();
        cy.get($numberToggleButton).should('not.be.checked');
      });

      it('토글버튼이 비활성화 상태일 때 복권의 번호가 보이지 않아야 한다.', () => {
        cy.get($lottoNumber).should('have.css', 'display', 'none');
      });
      it('토글버튼이 활성화 상태일 때 복권의 번호가 보여야 한다.', () => {
        cy.get($numberToggleButton).click({ force: true });
        cy.get($lottoNumber).should('have.css', 'display', 'inline');
      });
    }
  );

  context(
    '결과 확인하기 버튼을 누르면 당첨통계, 수익률을 모달로 확인할 수 있다.',
    () => {
      it('결과 확인하기 버튼이 존재 해야한다.');
      it(
        '당첨 번호를 입력할 6개의 Input과 보너스번호 입력 칸이 존재 해야한다.'
      );
      it(
        '값을 모두 입력하지 않은 경우 버튼을 결과 확인하기 버튼을 비활성화 한다.'
      );
      it(
        '값을 모두 입력한 경우 결과 확인하기 버튼을 클릭할때 모달창이 떠야한다.'
      );
      it('당첨 된 개수에 따라 모달에 개수가 표시 된다');
      it('당첨 된 개수에 따라 모달에 수익률이 표시 된다');
    }
  );
  // context('로또 당첨 금액은 고정되어 있는 것으로 가정한다.', () => {
  //   it('')
  // });
  context(
    '다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.',
    () => {
      it(
        '결과 모달이 생성되면 다시시작하기 버튼과 닫기 버튼이 생성되어야 한다.'
      );
      it(
        '닫기 버튼 클릭 시 모달만 사라지고 나머지 상태는 그대로 유지되어야 한다.'
      );
      it('다시 시작하기 버튼 클릭 시 모달이 사라져야한다.');
      it(
        '다시 시작하기 버튼 클릭 시 로또이미지들과 구입 금액도 리셋 되어야한다.'
      );
    }
  );
});
