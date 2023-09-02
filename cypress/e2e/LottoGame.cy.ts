import { SYMBOLS } from '@step1/constants/commons';
import { LOTTO_TERMS } from '@step1/constants/lotto';
import { CLASS_NAME } from '@step3/constants/selector';
import { CYPRESS_SELECTOR } from '@step4/constants/cypressSelector';
import { cypressUtilFunctions } from 'cypress/support/utils';

const DEFAULT_LOTTO_PRICE = 2_000;

describe('로또 게임 e2e test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  context('로또 게임 시작 전 테스트', () => {
    it('처음 유저가 페이지에 접근 시 로또 구매 창만 보여져야 한다.', () => {
      // then
      cy.isInitApp();
    });
  });
  context('로또 구매 기능 테스트', () => {
    it('구입 가격을 입력 후 확인 버튼을 누르면 로또가 발행되어 로또 아이콘이 보여져야 한다.', () => {
      // given - when
      cy.buyLotto(`${DEFAULT_LOTTO_PRICE}`);
      // then
      cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTOS_SECTION).should('be.visible');
      cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTO_ICON).each(($icon) => {
        cy.wrap($icon).should('be.visible');
      });
    });
  });
  context('로또 확인 기능 테스트', () => {
    beforeEach(() => {
      // given - when
      cy.buyLotto(`${DEFAULT_LOTTO_PRICE}`);
    });
    it('로또 구매 후 아이콘의 갯수가 구입 금액에 맞게 발행되었는지 확인한다.', () => {
      // then
      cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTO_ICON).should(
        'have.length',
        DEFAULT_LOTTO_PRICE / LOTTO_TERMS.PRICE_PER_LOTTO,
      );
    });
    it('번호 보기 버튼을 활성화 하면 로또 번호가 보여져야 한다.', () => {
      // when
      cy.forceClickLottoToggleButton();
      cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTO_NUMBERS).each(($lottoNumber) =>
        // then
        cy.wrap($lottoNumber).should('be.visible'),
      );
    });
    it('번호 보기 버튼을 비활성화 하면 로또 번호가 사라져야 한다.', () => {
      // when
      cy.forceClickLottoToggleButton();
      cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTOS_TOGGLE_BUTTON).uncheck({ force: true });
      cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTO_NUMBERS).each(($lottoNumber) =>
        // then
        cy.wrap($lottoNumber).should('not.be.visible'),
      );
    });
    it('사용자가 바라보는 로또는 1 ~ 45 사이의 숫자여야 한다.', () => {
      // when
      cy.forceClickLottoToggleButton();
      cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTO_NUMBERS).each(($lottoNumber) => {
        $lottoNumber
          .text()
          .split(SYMBOLS.COMMA)
          .map(Number)
          .forEach((lottoNumber) => {
            // then
            expect(lottoNumber).to.be.least(LOTTO_TERMS.MIN_LOTTO_NUMBER);
            expect(lottoNumber).to.be.most(LOTTO_TERMS.MAX_LOTTO_NUMBER);
          });
      });
    });
    it('사용자가 바라보는 로또는 중복되는 숫자가 존재하지 않아야 한다.', () => {
      // when
      cy.forceClickLottoToggleButton();
      cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTO_NUMBERS).each(($lottoNumber) => {
        const lottoNumbers = $lottoNumber.text().split(SYMBOLS.COMMA).map(Number);
        lottoNumbers.forEach((lottoNumber) => {
          // then
          expect(lottoNumbers.filter((_lottoNumber) => _lottoNumber === lottoNumber)).to.have.length(1);
        });
      });
    });
    it('사용자가 바라보는 로또는 오름차순으로 정렬되어야 한다.', () => {
      // when
      cy.forceClickLottoToggleButton();
      cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTO_NUMBERS).each(($lottoNumber) => {
        const lottoNumbers = cypressUtilFunctions.getLottoNumbers($lottoNumber);
        // then
        expect(lottoNumbers).to.be.deep.equal(cypressUtilFunctions.ascendLottoNumbers(lottoNumbers));
      });
    });
    it('사용자가 바라보는 로또는 6개의 숫자로 이루어져야 한다.', () => {
      // when
      cy.forceClickLottoToggleButton();
      cy.get(CYPRESS_SELECTOR.PURCHASED.LOTTO_NUMBERS).each(($lottoNumber) => {
        const lottoNumbers = cypressUtilFunctions.getLottoNumbers($lottoNumber);
        // then
        expect(lottoNumbers).to.have.length(LOTTO_TERMS.DEFAULT_LIMIT_LOTTO_COUNT);
      });
    });
  });
  context('당첨 확인 기능 테스트', () => {
    it('당첨 번호와 보너스 번호를 입력하고 결과 확인하기 버튼을 누르면 당첨 정보 모달이 보여져야 한다.', () => {
      // given - when
      cy.checkLottoNumbers();
      // then
      cy.get(CYPRESS_SELECTOR.WINNING_INFO.MODAL).should('be.visible');
    });
  });
  context('재 시작 기능 테스트', () => {
    it('재 시작하기 버튼을 누르면 게임 시작 전 화면과 동일해야 한다.', () => {
      // given - when
      cy.checkLottoNumbers();
      cy.get(CYPRESS_SELECTOR.WINNING_INFO.RESET_BUTTON).click();
      // then
      cy.isInitApp();
    });
  });
  context('UX 테스트', () => {
    it('게임 시작 전 로또 구매 창이 focus 되어 있어야 한다.', () => {
      // then
      cy.get(CYPRESS_SELECTOR.INPUT_PRICE.INPUT).should('be.focused');
    });
    it('로또 구매 후 로또 구매 창이 초기화 되어야 한다.', () => {
      // given - when
      cy.buyLotto(`${DEFAULT_LOTTO_PRICE}`);
      // then
      cy.get(CYPRESS_SELECTOR.INPUT_PRICE.INPUT).should('have.value', '');
    });
    it('모달 내 X 버튼을 누르면 모달이 사라져야 한다.', () => {
      // when
      cy.get(CYPRESS_SELECTOR.WINNING_INFO.MODAL).invoke('addClass', CLASS_NAME.OPEN);
      // then
      cy.get(CYPRESS_SELECTOR.WINNING_INFO.MODAL).should('be.visible');
      // when
      cy.get(CYPRESS_SELECTOR.WINNING_INFO.CLOSE_MODAL).click();
      // then
      cy.get(CYPRESS_SELECTOR.WINNING_INFO.MODAL).should('not.be.visible');
    });
  });
});
