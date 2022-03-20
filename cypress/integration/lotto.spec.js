import {
  LOTTO_COUNTS,
  LOTTO_NUMBERS_LIMIT,
  LOTTO_PRICE,
} from '../../src/js/models/lotto/constants';
import NOT_ALLOWED_PAY_UNIT from '../../src/js/models/lotto/messageConstants';

before(() => cy.visit('../../dist/index.html'));

const $payForm = () => cy.get('[data-target="lotto-pay-form"]');
const $payFormInput = () => $payForm().find('input');

const $paidSection = () => cy.get('[data-target="lotto-paid-section"]');

const $paidCounts = () => cy.get('[data-target="lotto-paid-counts"]');
const $paidCard = () => cy.get('[data-target="lotto-paid-card"]');
const $paidCardNumbers = () => cy.get('[data-target="lotto-paid-card-numbers"]');

const $paidSwitch = () => cy.get('[data-target="lotto-paid-switch"]');

const typePriceAndSubmit = (price) => {
  $payForm().type(price);
  $payForm().submit();
};

afterEach(() => {
  $payFormInput().clear();
  $paidSection().invoke('removeClass', 'visible');
});

describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
  context('구입 금액에 맞는 로또 개수를 받게 된다.', () => {
    const checkPriecAndPaidCounts = (price) => {
      const counts = price / LOTTO_PRICE;

      typePriceAndSubmit(price);
      $paidCounts().should('have.text', counts);
      $paidCard().should('have.length', counts);
    };

    it('1000원', () => {
      checkPriecAndPaidCounts(1000);
    });

    it('2000원', () => {
      checkPriecAndPaidCounts(2000);
    });

    it('10000원', () => {
      checkPriecAndPaidCounts(10000);
    });
  });
});

describe('로또 1장의 가격은 1,000원이다.', () => {
  context('1000원 단위로 로또를 구매 할 수 있다.', () => {
    const checkPriecAndPaidSectionVisible = (price) => {
      typePriceAndSubmit(price);
      $paidSection().should('be.visible');
    };

    it('1000원', () => {
      checkPriecAndPaidSectionVisible(1000);
    });

    it('2000원', () => {
      checkPriecAndPaidSectionVisible(2000);
    });

    it('10000원', () => {
      checkPriecAndPaidSectionVisible(10000);
    });
  });

  context('1000원 단위가 아닌 경우 유저에게 알럿을 표시한다.', () => {
    const checkAlertAndClear = (price) => {
      typePriceAndSubmit(price);

      cy.on('window:alert', (msg) => {
        expect(msg).to.contains(NOT_ALLOWED_PAY_UNIT);
      });

      $payFormInput().should('have.text', '');
    };

    it('1200원', () => {
      checkAlertAndClear(1200);
    });

    it('-100원', () => {
      checkAlertAndClear(-100);
    });

    it('0원', () => {
      checkAlertAndClear(0);
    });
  });
});

describe('소비자는 자동 구매를 할 수 있어야 한다.', () => {
  context('로또 번호가 자동으로 구입된다.', () => {
    const checkLottoValidated = (price) => {
      typePriceAndSubmit(price);
      $paidSwitch().click();

      $paidCardNumbers().each(($el, idx, $list) => {
        cy.wrap($el)
          .invoke('text')
          .then((txt) => {
            const lottoNumbers = txt.split(',');
            expect(lottoNumbers.length).equal(LOTTO_COUNTS);
            expect(lottoNumbers.forEach((lot) => expect(+lot).lte(LOTTO_NUMBERS_LIMIT)));
          });
      });
    };

    it('1000원', () => {
      checkLottoValidated(1000);
    });

    it('2000원', () => {
      checkLottoValidated(2000);
    });

    it('10000원', () => {
      checkLottoValidated(10000);
    });
  });

  context('로또 번호가 오름차순으로 정렬되어 있다.', () => {
    const checkOrdered = (price) => {
      typePriceAndSubmit(price);
      $paidSwitch().click();

      $paidCardNumbers().each(($el, idx, $list) => {
        cy.wrap($el)
          .invoke('text')
          .then((txt) => {
            const lottoNumbers = txt.split(',');
            expect(
              lottoNumbers
                .slice(1)
                .every((lot, idx) => expect(+lot).gt(+lottoNumbers[idx])),
            );
          });
      });
    };

    it('1000원', () => {
      checkOrdered(1000);
    });

    it('2000원', () => {
      checkOrdered(2000);
    });

    it('10000원', () => {
      checkOrdered(10000);
    });
  });
});

describe('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
  context('토글 버튼 클릭 후 로또 번호를 확인할 수 있다.', () => {
    const checkLottoNumbers = (price) => {
      typePriceAndSubmit(price);
      $paidSwitch().click();

      $paidCardNumbers().should('have.css', 'display', 'block');
    };

    it('1000원', () => {
      checkLottoNumbers(1000);
    });

    it('2000원', () => {
      checkLottoNumbers(2000);
    });

    it('10000원', () => {
      checkLottoNumbers(10000);
    });
  });

  context('토글 클릭 후 재구매시 토글 버튼이 비활성화 되어 있다.', () => {
    const checkSwitchButtonDisabled = (price) => {
      typePriceAndSubmit(price);
      $paidSwitch().click();
      $payForm().submit();

      $paidSwitch().should('not.be.checked');
      $paidCardNumbers().should('have.css', 'display', 'none');
    };

    it('1000원', () => {
      checkSwitchButtonDisabled(1000);
    });

    it('2000원', () => {
      checkSwitchButtonDisabled(2000);
    });

    it('10000원', () => {
      checkSwitchButtonDisabled(10000);
    });
  });
});
