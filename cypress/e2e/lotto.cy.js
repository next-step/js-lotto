import { ALERT } from '../../src/constants/alerts.js';
import { ELEMENT } from '../../src/constants/elements.js';

describe('로또 사이트 E2E 테스트', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  context('로또는 1장에 1,000원 단위로 구매할 수 있어야한다.', () => {
    it('구입금액을 입력할 Input이 존재해야한다.', () => {
      cy.get(ELEMENT.LOTTO_NUMBER_INPUT).should('exist');
    });

    it('값을 입력하지 않는 경우 제출버튼을 비활성화 한다', () => {
      cy.get(ELEMENT.LOTTO_NUMBER_INPUT).clear();
      cy.get(ELEMENT.LOTTO_SUBMIT_BUTTON).should('be.disabled');
    });

    it('100,000원이 넘어가는 금액의 경우 100,000원까지만 구매 가능하다고 경고창을 띄워준 뒤 입력값을 리셋시킨다.', () => {
      const purchaseValue = '100001';

      cy.get(ELEMENT.LOTTO_NUMBER_INPUT).type(purchaseValue);
      cy.get(ELEMENT.LOTTO_SUBMIT_BUTTON).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT.OVER_MAX_VALUE);
      });
      cy.on('window:confirm', () => true);
      cy.get(ELEMENT.LOTTO_NUMBER_INPUT).should('have.value', '');
    });

    it('1000원 단위로 입력하지 않고 제출하는 경우 경고창을 띄우고 입력값을 리셋시킨다.', () => {
      const purchaseValue = '1001';

      cy.get(ELEMENT.LOTTO_NUMBER_INPUT).type(purchaseValue);
      cy.get(ELEMENT.LOTTO_SUBMIT_BUTTON).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT.TYPE_THOUSAND_UNIT);
      });
      cy.on('window:confirm', () => true);
      cy.get(ELEMENT.LOTTO_NUMBER_INPUT).should('have.value', '');
    });

    it('숫자를 제외한 값을 입력하여도 숫자를 제외한 것은 화면에 렌더링 되지 않아야한다', () => {
      const [purchaseValue, expectedResult] = [
        ['1000!', '@1', '!'],
        ['1000', '1', ''],
      ];

      purchaseValue.forEach((eachTyping, index) => {
        cy.get(ELEMENT.LOTTO_NUMBER_INPUT).type(eachTyping);
        cy.get(ELEMENT.LOTTO_NUMBER_INPUT).should('have.value', expectedResult[index]);
        cy.get(ELEMENT.LOTTO_NUMBER_INPUT).clear();
      });
    });
  });

  context('소비자는 자동 구매를 할 수 있어야 한다.', () => {
    const [purchasePrice, result] = ['5000', '총 5개를 구매하였습니다.'];

    const checkText = (expectedResult) => {
      cy.get(ELEMENT.RESULT_TEXT).should('have.text', expectedResult);
    };

    it('확인(제출)버튼이 존재해야한다', () => {
      cy.get(ELEMENT.LOTTO_SUBMIT_BUTTON).should('exist');
    });

    it('확인(제출)버튼 클릭 시 구매한 갯수를 알려주는 문자가 렌더되어야 한다.', () => {
      cy.makeResult(purchasePrice);
      cy.moveAutoPurchase();
      checkText(result);
    });

    it('확인(제출)버튼 클릭 시 번호보기 버튼이 렌더되어야 한다.', () => {
      cy.makeResult(purchasePrice);
      cy.moveAutoPurchase();
      checkText(result);
      cy.get(ELEMENT.NUMBER_TOGGLE_BUTTON).should('exist');
    });

    it('엔터키를 누르는 경우 확인버튼 클릭과 동일하게 작동하여야 한다.', () => {
      cy.get(ELEMENT.LOTTO_NUMBER_INPUT).type(purchasePrice).type('{enter}');
      cy.moveAutoPurchase();
      checkText(result);
      cy.get(ELEMENT.NUMBER_TOGGLE_BUTTON).should('exist');
    });
  });

  context('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    const [purchaseValue, imageCount] = ['5000', 5];

    beforeEach(() => {
      cy.get(ELEMENT.LOTTO_NUMBER_INPUT).type(purchaseValue);
      cy.get(ELEMENT.LOTTO_SUBMIT_BUTTON).click();
      cy.moveAutoPurchase();
    });

    it('금액만큼(1000원당 1개)의 로또 이미지가 생성되어야 한다.', () => {
      cy.get(ELEMENT.LOTTO_IMAGE).should('have.length', imageCount);
    });
    it('금액만큼(1000원당 1개)의 난수 집합이 생성되어야 한다.', () => {
      cy.get(ELEMENT.LOTTO_NUMBER).should('have.length', imageCount);
    });
    it('금액만큼(1000원당 1개)의 난수 집합이 생성된 뒤 화면에서 숨겨져 있어야한다', () => {
      cy.get(ELEMENT.LOTTO_NUMBER).should('have.css', 'display', 'none');
    });
  });

  context('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
    const purchaseValue = '5000';

    beforeEach(() => {
      cy.get(ELEMENT.LOTTO_NUMBER_INPUT).type(purchaseValue);
      cy.get(ELEMENT.LOTTO_SUBMIT_BUTTON).click();
      cy.get(ELEMENT.NUMBER_TOGGLE_BUTTON).should('not.be.checked');
      cy.moveAutoPurchase();
    });

    it('토글버튼이 비활성화 상태일 때 복권의 번호가 보이지 않아야 한다.', () => {
      cy.get(ELEMENT.LOTTO_NUMBER).should('have.css', 'display', 'none');
    });
    it('토글버튼이 활성화 상태일 때 복권의 번호가 보여야 한다.', () => {
      cy.get(ELEMENT.NUMBER_TOGGLE_BUTTON).click({ force: true });
      cy.get(ELEMENT.LOTTO_NUMBER).should('have.css', 'display', 'inline');
    });
  });

  context('결과 확인하기 버튼을 누르면 당첨통계, 수익률을 모달로 확인할 수 있다.', () => {
    const PURCHASE_VALUE = '5000';
    const FIRST_PLAICE_WINNING_VALUE = '2000000000';

    beforeEach(() => {
      cy.buyNewLottoWithValue(PURCHASE_VALUE);

      cy.get(ELEMENT.NUMBER_TOGGLE_BUTTON).should('not.be.checked');
      cy.moveAutoPurchase();
    });

    it('결과 확인하기 버튼이 존재 해야한다.', () => {
      cy.get(ELEMENT.OPEN_RESULT_MODAL_BUTTON).should('exist');
    });
    it('당첨 번호를 입력할 6개의 Input과 보너스번호 입력 칸이 존재 해야한다.', () => {
      const winningNumberInputCount = 6,
        bonusNumberInputCount = 1;
      cy.get(ELEMENT.WINNING_NUMBERS_INPUT).should('have.length', winningNumberInputCount);
      cy.get(ELEMENT.BONUS_NUMBER_INPUT).should('have.length', bonusNumberInputCount);
    });

    it('값을 모두 입력하지 않은 경우 버튼을 결과 확인하기 버튼을 비활성화 한다.', () => {
      cy.get(ELEMENT.WINNING_NUMBERS_INPUT).each((winningNumberInput) => {
        cy.get(winningNumberInput).clear();
      });
      cy.get(ELEMENT.BONUS_NUMBER_INPUT).clear();
      cy.get(ELEMENT.OPEN_RESULT_MODAL_BUTTON).should('be.disabled');
    });

    it('값을 모두 입력한 경우 결과 확인하기 버튼을 클릭할때 모달창이 떠야한다.', () => {
      cy.winLottoInFirstPlace();
    });

    it('당첨 된 개수에 따라 모달에 개수가 표시 된다', () => {
      cy.winLottoInFirstPlace();
      const firstPrize = cy.get('[data-id=6개]').children().last();
      firstPrize.should('have.text', '1개');
    });

    it('당첨 된 개수에 따라 모달에 수익률이 표시 된다', () => {
      const profit = Math.round((FIRST_PLAICE_WINNING_VALUE - PURCHASE_VALUE) / PURCHASE_VALUE) * 100;

      cy.winLottoInFirstPlace();
      cy.get(ELEMENT.INVESTMENT_RETURN).should(($element) =>
        expect($element.text().trim()).to.equal(`당신의 총 수익률은 ${profit}%입니다.`)
      );
    });
  });

  context('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
    const PURCHASE_VALUE = '5000';
    beforeEach(() => {
      cy.buyNewLottoWithValue(PURCHASE_VALUE);
      cy.moveAutoPurchase();
      cy.winLottoInFirstPlace();
    });
    it('결과 모달이 생성되면 다시시작하기 버튼과 닫기 버튼이 생성되어야 한다.', () => {
      cy.get(ELEMENT.MODAL_CLOSE_BUTTON).should('exist');
      cy.get(ELEMENT.RESTART_BUTTON).should('exist');
    });
    it('닫기 버튼 클릭 시 모달만 사라지고 나머지 상태는 그대로 유지되어야 한다.', () => {
      cy.get(ELEMENT.MODAL_CLOSE_BUTTON).click();
      cy.wait(1000);
      cy.get('.modal').should('not.have.class', 'open');
      cy.get(ELEMENT.LOTTO_NUMBER_INPUT).should('have.value', PURCHASE_VALUE);
    });

    it('다시 시작하기 버튼 클릭 시 모달이 사라져야한다.', () => {
      cy.get(ELEMENT.RESTART_BUTTON).click();
      cy.wait(1000);
      cy.get('.modal').should('not.have.class', 'open');
    });

    it('다시 시작하기 버튼 클릭 시 로또이미지들과 구입 금액도 리셋 되어야한다.', () => {
      cy.get(ELEMENT.RESTART_BUTTON).click();
      cy.wait(1000);
      cy.get(ELEMENT.LOTTO_NUMBER_INPUT).should('not.have.value');
      cy.get(ELEMENT.RESULT_WRAPPER).should('have.css', 'display', 'none');
      cy.get(ELEMENT.CHECK_WRAPPER).should('have.css', 'display', 'none');
    });
  });

  context('소비자는 수동 구매를 할 수 있어야한다.', () => {
    const [PURCHASE_VALUE] = ['5000'];
    const MANUAL_NUMBERS = [11, 12, 13, 14, 15, 16];
    const INVALID_MANUAL_NUMBERS = [11, 12, 13, 14, 15, 46];
    const MANUAL_NUMBERS_LIST = [
      MANUAL_NUMBERS,
      MANUAL_NUMBERS,
      [21, 22, 23, 24, 25, 26],
      [31, 32, 33, 34, 35, 36],
      [41, 42, 43, 44, 45, 40],
    ];
    beforeEach(() => {
      cy.buyNewLottoWithValue(PURCHASE_VALUE);
    });

    it('수동 구매를 위한 입력창이 있어야 한다', () => {
      cy.get(ELEMENT.MANUAL_NUMBERS_INPUT).should('exist');
    });

    it('수동 구매를 위한 제출버튼이 있어야 한다', () => {
      cy.get(ELEMENT.MANUAL_SUBMIT_BUTTON).should('exist');
    });

    it('수동 구매한 개수를 알려주는 문자가 렌더 되어야 한다.', () => {
      cy.get(ELEMENT.RESULT_TEXT).should('exist');
    });

    it('남은 구매 개수를 자동구매로 진행할 버튼이 존재해야 한다.', () => {
      cy.get(ELEMENT.MOVE_AUTO_NUMBER_BUTTON).should('exist');
    });

    it('범위를 넘어가는 숫자로 수동 구매시 경고창이 떠야한다.', () => {
      cy.addManualNumbers(INVALID_MANUAL_NUMBERS);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT.IN_RANGE_WINNING_INPUT);
      });
    });

    it('자동구매로 진행 버튼 클릭 시 로또 티켓들이 생성 되어야 한다.', () => {
      cy.get(ELEMENT.MOVE_AUTO_NUMBER_BUTTON).should('exist');
      cy.get(ELEMENT.MOVE_AUTO_NUMBER_BUTTON).click({ force: true });
      cy.get(ELEMENT.LOTTO_NUMBER).should('have.css', 'display', 'none');
      cy.get(ELEMENT.NUMBER_TOGGLE_BUTTON).click({ force: true });
      cy.get(ELEMENT.LOTTO_NUMBER).should('have.css', 'display', 'inline');
    });

    it('수동 구매한 숫자는 결과보기 진행 시 로또 티켓에 존재해야 한다', () => {
      cy.addManualNumbers(MANUAL_NUMBERS);
      cy.moveAutoPurchase();
      cy.get(ELEMENT.NUMBER_TOGGLE_BUTTON).click({ force: true });
      cy.get(ELEMENT.LOTTO_NUMBER).should('have.css', 'display', 'inline');
      cy.contains(ELEMENT.LOTTO_NUMBER, MANUAL_NUMBERS.join(' '));
    });

    it('수동구매의 개수가 총 구매 개수와 동일한 경우 결과 보기 버튼으로 변경 되어야 한다.', () => {
      MANUAL_NUMBERS_LIST.forEach((numbers) => {
        cy.addManualNumbers(numbers);
      });
      cy.get(ELEMENT.DONE_MANUAL_BUTTON).should('exist');
    });

    it('수동구매를 완료하여 생성된 결과보기 버튼 클릭 시 로또 티켓들이 생성 되어야한다.', () => {
      MANUAL_NUMBERS_LIST.forEach((numbers) => {
        cy.addManualNumbers(numbers);
      });
      cy.get(ELEMENT.DONE_MANUAL_BUTTON).click({ force: true });
      cy.get(ELEMENT.NUMBER_TOGGLE_BUTTON).click({ force: true });
      cy.get(ELEMENT.LOTTO_NUMBER).should('have.css', 'display', 'inline');
    });
  });
});
