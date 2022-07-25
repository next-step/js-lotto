import { PAYMENT_UNIT } from '../../src/js/constants/common.js';

describe('로또 생성 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('최초 접속했을 경우, 금액 입력창이 비워져 있다.', () => {
    cy.get('#input-amount').should('have.value', '');
  });

  it('금액 입력창에 음수의 금액을 입력 후 구매한다.', () => {
    const inputAmount = -1;

    cy.get('#input-amount').type(inputAmount);
    cy.get('#amount-submint').click();

    cy.get('#input-amount')
      .invoke('prop', 'validationMessage')
      .should('eq', '값은 1000 이상이어야 합니다.');
  });

  it('금액 입력창에 100000만원 이상의 금액을 입력 후 구매한다.', () => {
    const inputAmount = 101000;

    cy.get('#input-amount').type(inputAmount);
    cy.get('#amount-submint').click();

    cy.get('#input-amount')
      .invoke('prop', 'validationMessage')
      .should('eq', '값은 100000 이하여야 합니다.');
  });

  it('금액 입력창에 1000원 단위가 아닌 금액을 입력 후 구매한다.', () => {
    const inputAmount = 7777;

    cy.get('#input-amount').type(inputAmount);
    cy.get('#form-amount').submit();

    cy.alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
    cy.get('#input-amount').should('have.value', '');
  });

  it('1000원 단위 금액 입력 후 구매한다.', () => {
    const inputAmount = 7000;
    const lottoCount = inputAmount / PAYMENT_UNIT;

    cy.get('#form-amount').within(() => {
      cy.get('input').type(inputAmount);
      cy.root().submit();
    });

    cy.get('#lotto-amount').should('have.text', `총 ${lottoCount}개를 구매하였습니다.`);
    cy.get('.lotto-number').should('have.length', lottoCount);
  });

  it('번호보기 라디오 버튼을 On으로 토글하면, 구매한 로또의 번호를 확인할 수 있다.', () => {
    const inputAmount = 7000;
    cy.get('#input-amount').type(inputAmount);
    cy.get('#form-amount').submit();

    cy.get('.switch').click();

    cy.get('.lotto-number--visible').should('have.length', 7);
  });

  it('번호보기 라디오 버튼을 Off로 토글하면, 구매한 로또의 번호를 확인할 수 없다.', () => {
    const inputAmount = 7000;
    cy.get('#input-amount').type(inputAmount);
    cy.get('#form-amount').submit();
    cy.get('.switch').click();

    cy.get('.switch').click();

    cy.get('lotto-number--visible').should('have.length', 0);
  });
});

describe('로또 당첨 번호 입력 테스트', () => {
  beforeEach(() => {
    cy.visit('/');

    const inputAmount = 7000;
    cy.get('#input-amount').type(inputAmount);
    cy.get('#form-amount').submit();
  });

  it('로또를 구입하면, 당첨 번호 입력폼을 확인할 수 있다.', () => {
    cy.get('#form-result').should('be.visible');
  });

  it('당첨 번호를 부분 입력한 경우, "이 입력란을 작성하세요." 메시지가 발생 및 결과 모달을 확인할 수 없다.', () => {
    const targetIndex = 3;
    cy.get('.winning-number').each(($el, index) => {
      if (index !== targetIndex) cy.wrap($el).type(index + 1);
    });
    cy.get('.bonus-number').type(7);

    cy.get('.open-result-modal-button').click();

    cy.get('.winning-number').then($el => {
      cy.wrap($el[targetIndex])
        .invoke('prop', 'validationMessage')
        .should('eq', '이 입력란을 작성하세요.');
    });
    cy.get('.result-table').should('not.be.visible');
  });

  it('보너스 번호만 입력 안한 경우, "이 입력란을 작성하세요." 메시지가 발생 및 결과 모달을 확인할 수 없다.', () => {
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(index + 1);
    });

    cy.get('.open-result-modal-button').click();

    cy.get('.bonus-number')
      .invoke('prop', 'validationMessage')
      .should('eq', '이 입력란을 작성하세요.');
    cy.get('.result-table').should('not.be.visible');
  });

  // TODO: constants 사용할 수 있다.
  it('당첨 번호 입력폼에 45 초과의 숫자를 입력한 경우, "값은 45 이하여야 합니다." 메시지 발생 및 결과 모달을 확인할 수 없다.', () => {
    const targetIndex = 3;
    const outOfRangValue = 46;

    cy.get('.winning-number').each(($el, index) => {
      if (index !== targetIndex) cy.wrap($el).type(index + 1);
      else cy.wrap($el).type(outOfRangValue);
    });
    cy.get('.bonus-number').type(7);

    cy.get('.open-result-modal-button').click();

    cy.get('.winning-number').then($el => {
      cy.wrap($el[targetIndex])
        .invoke('prop', 'validationMessage')
        .should('eq', '값은 45 이하여야 합니다.');
    });
    cy.get('.modal').should('not.be.visible');
  });

  // TODO: constants 사용할 수 있다.
  it('당첨 번호 입력폼에 1 미만의 숫자를 입력한 경우, "값은 1 이상이어야 합니다." 메시지 발생 및 결과 모달을 확인할 수 없다.', () => {
    const targetIndex = 3;
    const outOfRangValue = 0;
    cy.get('.bonus-number').type(7);

    cy.get('.winning-number').each(($el, index) => {
      if (index !== targetIndex) cy.wrap($el).type(index + 1);
      else cy.wrap($el).type(outOfRangValue);
    });

    cy.get('.open-result-modal-button').click();

    cy.get('.winning-number').then($el => {
      cy.wrap($el[targetIndex])
        .invoke('prop', 'validationMessage')
        .should('eq', '값은 1 이상이어야 합니다.');
    });
    cy.get('.modal').should('not.be.visible');
  });

  it('당첨 번호 입력폼에 중복된 숫자를 입력한 경우, "당첨 번호는 중복될 수 없습니다." Alert이 발생 및 결과 모달을 확인할 수 없다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    const duplicateIndexList = [2, 3];
    const duplicateValue = 45;

    cy.get('.bonus-number').type(7);

    cy.get('.winning-number').each(($el, index) => {
      if (duplicateIndexList.includes(index)) cy.wrap($el).type(duplicateValue);
      else cy.wrap($el).type(index + 1);
    });

    cy.get('.open-result-modal-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith('당첨 번호는 중복될 수 없습니다.');
      });

    cy.get('.modal').should('not.be.visible');
  });

  it('당첨 번호와 보너스 입력폼에 중복된 숫자를 입력한 경우, "당첨 번호는 중복될 수 없습니다." Alert이 발생 및 결과 모달을 확인할 수 없다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    const duplicateIndex = 2;
    const duplicateValue = 45;

    cy.get('.bonus-number').type(duplicateValue);
    cy.get('.winning-number').each(($el, index) => {
      if (index === duplicateIndex) cy.wrap($el).type(duplicateValue);
      else cy.wrap($el).type(index + 1);
    });

    cy.get('.open-result-modal-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith('당첨 번호는 중복될 수 없습니다.');
      });

    cy.get('.modal').should('not.be.visible');
  });

  it('정상적으로 당첨 번호를 입력하고 결과 확인하기를 누르면, 당첨 결과 모달이 열린다.', () => {
    cy.get('.bonus-number').type(7);
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(index + 1);
    });

    cy.get('.open-result-modal-button').click();

    cy.get('.modal').should('be.visible');
  });
});

describe('당첨 결과 모달 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('/');

    const inputAmount = 7000;
    cy.get('#input-amount').type(inputAmount);
    cy.get('#form-amount').submit();

    cy.get('.bonus-number').type(7);
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(index + 1);
    });
    cy.get('.open-result-modal-button').click();
  });

  it('결과 확인하기를 누르면, 당첨 결과 모달이 열린다.', () => {
    cy.get('.modal').should('be.visible');
  });

  it('모달 내부의 x 버튼을 누르면 종료된다.', () => {
    cy.get('.modal-close').click();

    cy.get('.modal').should('not.be.visible');
  });

  it('inner 모달 외부를 누르면 종료된다.', () => {
    cy.get('body').click(0, 0);

    cy.get('.modal').should('not.be.visible');
  });

  it('inner 모달 내부를 누르면 종료된지 않는다..', () => {
    cy.get('.modal-inner').click(0, 0, { force: true });

    cy.get('.modal').should('be.visible');
  });
});

describe('당첨 결과 확인 테스트', () => {
  beforeEach(() => {
    cy.visit('/');

    const inputAmount = 7000;
    cy.get('#input-amount').type(inputAmount);
    cy.get('#form-amount').submit();

    cy.get('.bonus-number').type(7);
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(index + 1);
    });
    cy.get('.open-result-modal-button').click();
  });

  it('당첨 결과 모달에서 다시 시작하기를 누르면, 모달이 종료된다.', () => {
    cy.get('#restart-button').click();

    cy.get('.modal').should('not.be.visible');
  });

  it('당첨 결과 모달에서 다시 시작하기를 누르면, 모든 input과 구매한 로또가 초기화된다. ', () => {
    cy.get('#restart-button').click();

    cy.get('#input-amount').should('have.value', '');
    cy.get('#lotto-amount').should('have.text', `총 0개를 구매하였습니다.`);
    cy.get('.switch').should('not.be.checked');
  });
});
