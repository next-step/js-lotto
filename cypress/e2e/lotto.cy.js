import { ERROR_MESSAGE, LOTTO } from '../../src/js/constants/index.js';
import { getLottoRank, getRateOfReturn } from '../../src/js/service/lotto.js';
import { DUMMY_DATA } from '../constants/lotto.js';
import { SELECTOR } from '../constants/selector.js';

beforeEach(() => {
  cy.visit('index.html');
});

const buyLotto = (price) => {
  cy.getByDataset(SELECTOR.PURCHASE_PRICE_INPUT).type(price);
  cy.getByDataset(SELECTOR.PAYMENT_FORM).submit();
};

const typeWinningNumbers = () => {
  cy.getByDataset(SELECTOR.WINNING_NUMBER_INPUT_WRAPPER)
    .children()
    .each(($el, idx) => {
      cy.wrap($el).type(String(DUMMY_DATA.WINNING_NUMBERS[idx]));
    })
    .then(() => {
      cy.getByDataset(SELECTOR.BONUS_NUMBER_INPUT).type(DUMMY_DATA.BONUS_NUMBER);
    });
};

const typeDuplicatedWinningNumbers = () => {
  cy.getByDataset(SELECTOR.WINNING_NUMBER_INPUT_WRAPPER)
    .children()
    .each(($el) => {
      cy.wrap($el).type(String(DUMMY_DATA.WINNING_NUMBERS[0]));
    })
    .then(() => {
      cy.getByDataset(SELECTOR.BONUS_NUMBER_INPUT).type(DUMMY_DATA.BONUS_NUMBER);
    });
};

const clickOpenResultModalButton = () => {
  cy.getByDataset(SELECTOR.OPEN_RESULT_MODAL_BUTTON).click();
};

describe('로또 어플리케이션을 테스트한다.', () => {
  describe('결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.', () => {
    beforeEach(() => {
      buyLotto('100000');
    });

    it('결과 확인하기 버튼이 존재한다.', () => {
      cy.getByDataset(SELECTOR.OPEN_RESULT_MODAL_BUTTON).should('exist');
    });

    it('결과 확인하기 버튼을 누를 때 당첨 번호와 보너스 번호에 중복된 번호가 있으면 alert을 띄운다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      typeDuplicatedWinningNumbers();

      cy.getByDataset(SELECTOR.OPEN_RESULT_MODAL_BUTTON)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.DUPLICATED_LOTTO_WINNING_NUMBER);
        });
    });

    it('결과 확인하기 버튼을 누르면 모달창이 뜬다.', () => {
      typeWinningNumbers();
      clickOpenResultModalButton();

      cy.getByDataset(SELECTOR.MODAL).should('have.class', 'open');
    });

    it('모달창에서 보여지는 당첨 통계가 실제 구매한 로또의 당첨 통계와 동일한지 검증한다.', () => {
      const NUMBER_OF_WIN_INDEX = 0;

      const lottoWinningCount = {
        3: 0,
        4: 0,
        5: 0,
        '5_BONUS': 0,
        6: 0,
      };

      const viewLottoWinningCount = {
        3: 0,
        4: 0,
        5: 0,
        '5_BONUS': 0,
        6: 0,
      };

      cy.getByDataset(SELECTOR.LOTTO_DETAIL_NUMBER).each(($el) => {
        const dummyLottoNumberArray = $el.text().split(',').map(Number);

        const rank = getLottoRank(dummyLottoNumberArray, DUMMY_DATA.WINNING_NUMBERS, DUMMY_DATA.BONUS_NUMBER);
        if (rank < LOTTO.WINNING_MINIMUM_NUMBER) return;

        lottoWinningCount[rank]++;
      });

      typeWinningNumbers();
      clickOpenResultModalButton();

      cy.getByDataset(SELECTOR.LOTTO_WINNING_COUNT)
        .each(($el) => {
          const { rank } = $el.get(0).dataset;
          viewLottoWinningCount[rank] = Number($el.text()[NUMBER_OF_WIN_INDEX]);
        })
        .then(() => {
          expect(JSON.stringify(lottoWinningCount)).to.equal(JSON.stringify(viewLottoWinningCount));
        });
    });

    it('모달창에서 보여지는 수익률이 실제 구매한 로또의 수익률과 일치하는지 검증한다.', () => {
      const lottoWinningCount = {
        3: 0,
        4: 0,
        5: 0,
        '5_BONUS': 0,
        6: 0,
      };

      cy.getByDataset(SELECTOR.LOTTO_DETAIL_NUMBER)
        .each(($el) => {
          const dummyLottoNumberArray = $el.text().split(',').map(Number);

          const rank = getLottoRank(dummyLottoNumberArray, DUMMY_DATA.WINNING_NUMBERS, DUMMY_DATA.BONUS_NUMBER);
          if (rank < LOTTO.WINNING_MINIMUM_NUMBER) return;

          lottoWinningCount[rank]++;
        })
        .then(() => {
          typeWinningNumbers();
          clickOpenResultModalButton();

          const returnOfRate = getRateOfReturn(lottoWinningCount, 100000);

          cy.getByDataset(SELECTOR.RATE_OF_RETURN).should('have.text', `당신의 총 수익률은 ${returnOfRate}%입니다.`);
        });
    });
  });

  describe('다시 시작하기 버튼을 누르면 초기화되서 다시 구매를 시작할 수 있다.', () => {
    beforeEach(() => {
      buyLotto('100000');
      typeWinningNumbers();
      clickOpenResultModalButton();
    });

    it('다시 시작하기 버튼이 존재한다.', () => {
      cy.getByDataset(SELECTOR.RESET_BUTTON).should('exist');
    });

    it('다시 시작하기 버튼을 클릭하면 모달창과 구매한 로또 정보가 화면에서 사라진다.', () => {
      cy.getByDataset(SELECTOR.RESET_BUTTON).click();

      cy.getByDataset(SELECTOR.MODAL).should('not.have.class', 'open');

      cy.getByDataset(SELECTOR.PURCHASED_LOTTO).should('have.class', 'none');
      cy.getByDataset(SELECTOR.LOTTO_RESULT_FORM).should('have.class', 'none');
    });

    it('다시 구매를 할 수 있다.', () => {
      cy.getByDataset(SELECTOR.RESET_BUTTON).click();

      cy.getByDataset(SELECTOR.MODAL).should('not.have.class', 'open');
      cy.getByDataset(SELECTOR.PURCHASED_LOTTO).should('have.class', 'none');
      cy.getByDataset(SELECTOR.LOTTO_RESULT_FORM).should('have.class', 'none');
      cy.getByDataset(SELECTOR.PURCHASE_PRICE_INPUT).should('have.value', '');
    });
  });

  describe('로또 구입 금액을 입력할 수 있다.', () => {
    it('화면에 구입 금액을 입력할 input 태그가 존재한다.', () => {
      cy.getByDataset(SELECTOR.PURCHASE_PRICE_INPUT).should('exist');
    });

    it('input 태그에 구입 금액을 입력하면 입력한 금액이 input 태그의 value 값과 같아야 한다.', () => {
      cy.getByDataset(SELECTOR.PURCHASE_PRICE_INPUT).type('5000');

      cy.getByDataset(SELECTOR.PURCHASE_PRICE_INPUT).should('have.value', '5000');
    });

    it('구입 금액은 숫자만 입력할 수 있다.', () => {
      cy.getByDataset(SELECTOR.PURCHASE_PRICE_INPUT).type('ab2000cd');

      cy.getByDataset(SELECTOR.PURCHASE_PRICE_INPUT).should('have.value', '2000');
    });
  });

  describe('로또 구입 금액에 해당하는 로또를 발급해야 한다.', () => {
    it('화면에 로또를 발급할 때 클릭해야 할 버튼이 존재한다.', () => {
      cy.getByDataset(SELECTOR.PURCHASE_BUTTON).should('exist');
    });

    it('로또 구입 금액을 0원으로 입력하고 확인 버튼을 클릭하면 사용자에게 alert를 띄워준다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.getByDataset(SELECTOR.PURCHASE_PRICE_INPUT).type('0');

      cy.getByDataset(SELECTOR.PAYMENT_FORM)
        .submit()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_ZERO_LOTTO_PRICE);
        });
    });

    it('로또 구입 금액을 음수로 입력하고 확인 버튼을 클릭하면 사용자에게 alert를 띄워준다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.getByDataset(SELECTOR.PURCHASE_PRICE_INPUT).type('-1000');

      cy.getByDataset(SELECTOR.PAYMENT_FORM)
        .submit()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_NEGATIVE_LOTTO_PRICE);
        });
    });

    it('구입할 금액을 입력하고 확인 버튼을 클릭하면 화면에 구매 안내메시지의 개수가 구입한 로또의 개수와 일치해야 한다.', () => {
      buyLotto('100000');

      cy.getByDataset(SELECTOR.LOTTO_PURCHASE_COUNT_TEXT).should('have.text', '100');
    });

    it('구입할 금액을 입력하고 확인 버튼을 클릭하면 화면에 로또 아이콘의 개수가 구입한 로또의 개수와 일치해야 한다.', () => {
      buyLotto('100000');

      cy.getByDataset(SELECTOR.LOTTO_ICON_LIST).should('have.length', '100');
    });
  });

  describe('로또 1장의 가격은 1,000원이다.', () => {
    it('로또 구입 금액을 1000원 단위로 입력하지 않고 확인 버튼을 클릭하면 사용자에게 alert를 띄워준다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.getByDataset(SELECTOR.PURCHASE_PRICE_INPUT).type('1500');

      cy.getByDataset(SELECTOR.PAYMENT_FORM)
        .submit()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_LOTTO_PRICE_UNIT);
        });
    });
  });

  describe('복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.', () => {
    beforeEach(() => {
      buyLotto('100000');
    });
    it('로또를 발급하고 난 후에, 화면에 번호보기 토글 버튼이 존재한다.', () => {
      cy.getByDataset(SELECTOR.LOTTO_NUMBERS_TOGGLE_BUTTON).should('exist');
    });

    it('번호보기 토글 버튼을 클릭하면 각각의 로또 아이콘에 번호가 보여져야 한다.', () => {
      cy.getByDataset(SELECTOR.LOTTO_NUMBERS_TOGGLE_BUTTON).check({ force: true });

      cy.getByDataset(SELECTOR.LOTTO_DETAIL_NUMBER).should('exist');
    });

    it('번호보기 토글 버튼을 클릭해서 checked가 된 상태에서 토글 버튼을 다시 클릭하면 로또 아이콘에 번호가 사라져야 한다.', () => {
      cy.getByDataset(SELECTOR.LOTTO_NUMBERS_TOGGLE_BUTTON).check({ force: true });
      cy.getByDataset(SELECTOR.LOTTO_NUMBERS_TOGGLE_BUTTON).uncheck({ force: true });

      cy.getByDataset(SELECTOR.LOTTO_DETAIL_NUMBER).should('have.class', 'none');
    });
  });
});
