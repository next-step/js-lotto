describe('로또 사이트 E2E 테스트', () => {
  const $lottoInput = '[data-id=lotto-number-input]';
  const $lottoButton = '[data-id=lotto-submit-button]';
  const $numberToggleButton = '[data-id=number-toggle-button]';
  const $resultSpan = '[data-id=result-text]';
  const $lottoImage = '[data-id=lotto-image]';
  const $lottoNumber = '[data-id=lotto-number]';
  const $submitButton = '.open-result-modal-button';
  const $winningNumberInput = '.winning-number';
  const $bonusNumberInput = '.bonus-number';
  const $investmentReturnSpan = '[data-id=investment-return]';
  const $modalCloseButton = '[data-id=modal-close-button]';
  const $modalRestartButton = '[data-id=restart-button]';
  const $purchaseResultWrapper = '#purchased-result';
  const $checkResultWrapper = '#check-result';

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
      const PURCHASE_VALUE = '5000';
      const FIRST_PLAICE_WINNING_VALUE = '2000000000';

      beforeEach(() => {
        cy.buyNewLottoWithValue(PURCHASE_VALUE);

        cy.get($numberToggleButton).should('not.be.checked');
      });

      it('결과 확인하기 버튼이 존재 해야한다.', () => {
        cy.get($submitButton).should('exist');
      });
      it('당첨 번호를 입력할 6개의 Input과 보너스번호 입력 칸이 존재 해야한다.', () => {
        const winningNumberInputCount = 6,
          bonusNumberInputCount = 1;
        cy.get($winningNumberInput).should(
          'have.length',
          winningNumberInputCount
        );
        cy.get($bonusNumberInput).should('have.length', bonusNumberInputCount);
      });

      it('값을 모두 입력하지 않은 경우 버튼을 결과 확인하기 버튼을 비활성화 한다.', () => {
        cy.get($winningNumberInput).each((winningNumberInput) => {
          cy.get(winningNumberInput).clear();
        });
        cy.get($bonusNumberInput).clear();
        cy.get($submitButton).should('be.disabled');
      });

      it('값을 모두 입력한 경우 결과 확인하기 버튼을 클릭할때 모달창이 떠야한다.', () => {
        cy.winLottoInFirstPlace();
      });

      it('당첨 된 개수에 따라 모달에 개수가 표시 된다', () => {
        cy.winLottoInFirstPlace();
        cy.get('[data-id=6개]').children().last().should('have.text', '1개');
      });

      it('당첨 된 개수에 따라 모달에 수익률이 표시 된다', () => {
        const profit =
          Math.round(
            (FIRST_PLAICE_WINNING_VALUE - PURCHASE_VALUE) / PURCHASE_VALUE
          ) * 100;

        cy.winLottoInFirstPlace();
        cy.get($investmentReturnSpan).should(($element) =>
          expect($element.text().trim()).to.equal(
            `당신의 총 수익률은 ${profit}%입니다.`
          )
        );
      });
    }
  );

  context(
    '다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.',
    () => {
      const PURCHASE_VALUE = '5000';
      beforeEach(() => {
        cy.buyNewLottoWithValue(PURCHASE_VALUE);
        cy.winLottoInFirstPlace();
      });
      it('결과 모달이 생성되면 다시시작하기 버튼과 닫기 버튼이 생성되어야 한다.', () => {
        cy.get($modalCloseButton).should('exist');
        cy.get($modalRestartButton).should('exist');
      });
      it('닫기 버튼 클릭 시 모달만 사라지고 나머지 상태는 그대로 유지되어야 한다.', () => {
        cy.get($modalCloseButton).click();
        cy.wait(1000);
        cy.get('.modal').should('not.have.class', 'open');
        cy.get($lottoInput).should('have.value', PURCHASE_VALUE);
      });

      it('다시 시작하기 버튼 클릭 시 모달이 사라져야한다.', () => {
        cy.get($modalRestartButton).click();
        cy.wait(1000);
        cy.get('.modal').should('not.have.class', 'open');
      });

      it('다시 시작하기 버튼 클릭 시 로또이미지들과 구입 금액도 리셋 되어야한다.', () => {
        cy.get($modalRestartButton).click();
        cy.wait(1000);
        cy.get($lottoInput).should('not.have.value');
        cy.get($purchaseResultWrapper).should('have.css', 'display', 'none');
        cy.get($checkResultWrapper).should('have.css', 'display', 'none');
      });
    }
  );
});
