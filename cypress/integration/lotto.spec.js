import { ERROR_MESSAGES, NUMBER } from '../../src/js/constants';
import { isRangeNumberInLotto } from '../../src/js/utils';

const handleInputPrice = (number) => cy.get('#form-price input[type=number]').type(number);
const handleInputWinningNumbers = (numbers) => {
  cy.get('#form-winning').within(() => {
    numbers.forEach((number, index) => {
      cy.get('input').eq(index).type(number);
    });
  });
};
const addBonusNumber = (numbers) => {
  const lotto = new Set(numbers);
  while (lotto.size < NUMBER.LOTTO_LENGTH + 1) {
    const num = Math.floor(Math.random() * 44) + 1;
    lotto.add(num);
  }
  return [...lotto].sort((a, b) => a - b);
};

// 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
// [x] 결과 확인하기 버튼을 누르면 당첨번호, 보너스 번호 가 겹치는지 확인
// [] 안겹치면 모달 등장
// [] 모달에 당첨통계, 수익률 확인

// 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
// [] 당첨금, 당첨 갯수 확인

// 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.
// [] 다시시작하기 버튼을 누르면 로또 앱 초기화

describe('로또 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('첫화면 렌더링 시에, 로또리스트, 당첨번호 form 비노출', () => {
    cy.get('#lotto-list').should('not.be.visible');
    cy.get('#form-winning').should('not.be.visible');
  });

  context('로또 금액 입력이 잘못된 경우에 따른 경고창 노출', () => {
    it('로또 금액 입력 없이 확인 버튼 클릭할 때 경고창 노출', () => {
      const stub = cy.stub();

      cy.on('window:alert', stub);
      cy.get('#form-price button[type=submit]')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(ERROR_MESSAGES.EMPTY_MONEY);
        });
    });
    it('로또 금액을 1,000원 이하로 구매하는 경우 경고창 노출', () => {
      handleInputPrice(500);
      const stub = cy.stub();

      cy.on('window:alert', stub);
      cy.get('#form-price button[type=submit]')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(ERROR_MESSAGES.MIN_PRICE);
        });
    });
    it('로또 금액을 100,000원 초과로 구매하는 경우 경고창 노출', () => {
      handleInputPrice(100001);
      const stub = cy.stub();

      cy.on('window:alert', stub);
      cy.get('#form-price button[type=submit]')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(ERROR_MESSAGES.MAX_PRICE);
        });
    });
    it('로또 금액단위가 맞지않는 경우 경고창 노출', () => {
      handleInputPrice(2022);
      const stub = cy.stub();

      cy.on('window:alert', stub);
      cy.get('#form-price button[type=submit]')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(ERROR_MESSAGES.BUY_UNIT);
        });
    });
  });

  context('로또 금액이 정상적으로 입력된 경우', () => {
    it('로또 구매 성공시 로또 수량, 로또 아이콘, 당첨금 확인 form 표시', () => {
      handleInputPrice(3000);
      cy.get('#form-price button[type=submit]').click();
      cy.get('#lotto-list').should('be.visible');
      cy.get('#form-winning').should('be.visible');
      cy.get('li.lotto-list-item').should('have.length', 3);
      cy.get('label[data-lotto="count-label"]').contains(3);
    });
  });

  context('로또 구매 이후 번호보기 토글버튼 클릭한 경우', () => {
    it('6개의 로또번호 숫자가 중복되지 않는지 확인', () => {
      handleInputPrice(3000);
      cy.get('#form-price button[type=submit]').click();
      cy.get('.switch').click();
      cy.get('li.lotto-list-item').each(($item) => {
        const numbers = $item.children('.lotto-detail').text().split(', ');
        expect(numbers.length).to.equal(NUMBER.LOTTO_LENGTH);
        expect(new Set(numbers).size).to.equal(NUMBER.LOTTO_LENGTH);
        for (const number of numbers) {
          const isLottoNumber = isRangeNumberInLotto(number);
          expect(isLottoNumber).to.be.true;
        }
      });
    });
  });

  context('당첨 번호를 잘못입력한 경우에 따른 경고창 노출', () => {
    it('당첨 번호 입력이 없는 경우', () => {
      const stub = cy.stub();
      handleInputPrice(3000);
      cy.get('#form-price button[type=submit]').click();

      cy.on('window:alert', stub);
      cy.get('#form-winning button[type=submit]')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(ERROR_MESSAGES.EMPTY_NUMBER);
        });
    });

    it('보너스 번호 입력이 없는 경우', () => {
      const stub = cy.stub();
      handleInputPrice(3000);
      cy.get('#form-price button[type=submit]').click();

      handleInputWinningNumbers([1, 2, 3, 4, 5, 6]);
      cy.on('window:alert', stub);
      cy.get('#form-winning button[type=submit]')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(ERROR_MESSAGES.EMPTY_BONUS_NUMBER);
        });
    });

    it('중복되는 번호를 입력한 경우', () => {
      const stub = cy.stub();
      handleInputPrice(1000);
      cy.get('#form-price button[type=submit]').click();

      handleInputWinningNumbers([1, 1, 1, 1, 1, 1, 1]);
      cy.on('window:alert', stub);
      cy.get('#form-winning button[type=submit]')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(ERROR_MESSAGES.DUPLICATED_NUMBER);
        });
    });
  });

  // context('당첨번호가 정상적으로 입력된 경우', () => {
  //   it('결과 확인 버튼 클릭시 모달 등장 당첨통계 수익률 표시', () => {
  //     handleInputPrice(1000);
  //     cy.get('#form-price button[type=submit]').click();

  //     cy.get('#lotto-list ul li span.lotto-detail').then(($span) => {
  //       const lottoNumbers = $span.text().split(', ').map(Number);
  //       const lottoNumbersWithBonus = addBonusNumber(lottoNumbers);
  //       handleInputWinningNumbers(lottoNumbersWithBonus);
  //     });
  //     cy.get('#form-winning button').click();

  //     cy.get('.modal').should('be.visible');
  //   });
  // });
});
