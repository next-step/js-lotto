import {
  ERR_MESSAGE,
  LOTTO_PRICES,
  TEST,
  VALUE,
} from '../../src/js/util/Constans.js';
import { getProfitRate } from '../../src/js/util/lottoUtil.js';
import {
  getMatchFiveWithBonus,
  getMatchNum,
  setAliase,
} from '../util/cypressUtil.js';

describe('로또 동작 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    setAliase();
  });
  context('오류 발생 테스트', () => {
    it('당첨번호를 전부 채우지 않으면 오류(INVAILD_NUMS)발생', () => {
      cy.get('@purchaseInput').type(TEST.PROPER_PRICE).type('{enter}');
      cy.get('#winner-num-input-wrapper')
        .find('input[type="number"]')
        .eq(0)
        .type(TEST.WINNER_NUMS[0]);
      cy.get('#winner-num-submitBtn').click();

      cy.get('@windowAlert').should(
        'be.calledWith',
        ERR_MESSAGE.WINNER_NUMBER.INVAILD_NUMS
      );
    });

    it('중복된 당첨번호를 채우면 오류(DUPLICATE_NUMS)발생', () => {
      cy.get('@purchaseInput').type(TEST.PROPER_PRICE).type('{enter}');
      cy.get('#winner-num-input-wrapper')
        .find('input[type="number"]')
        .then(($inputs) => {
          [...$inputs].forEach(($input, idx) =>
            cy.wrap($input).type(TEST.DUPLICATE_WINNER_NUMS[idx])
          );
        });
      cy.get('#winner-num-submitBtn').click();

      cy.get('@windowAlert').should(
        'be.calledWith',
        ERR_MESSAGE.WINNER_NUMBER.DUPLICATE_NUMS
      );
    });

    it(`최소 금액(1000원) 이하인 ${TEST.LOW_PRICE}원의 로또를 구입시 오류(INVAILD_PRICE) 발생`, () => {
      cy.get('@purchaseInput').type(TEST.LOW_PRICE).type('{enter}');
      cy.get('@windowAlert').should(
        'be.calledWith',
        ERR_MESSAGE.LOTTO.INVAILD_PRICE
      );
    });

    it(`최대 금액(100000원) 이상인 ${TEST.HIGH_PRICE}원의 로또를 구입시 오류(INVAILD_PRICE) 발생`, () => {
      cy.get('@purchaseInput').type(TEST.HIGH_PRICE).type('{enter}');
      cy.get('@windowAlert').should(
        'be.calledWith',
        ERR_MESSAGE.LOTTO.INVAILD_PRICE
      );
    });
  });

  context(`${TEST.PROPER_PRICE}원의 로또를 구입`, () => {
    beforeEach(() => {
      cy.get('@purchaseInput').type(TEST.PROPER_PRICE).type('{enter}');
    });
    it('구입한 로또 목록이 보여야한다.', () => {
      cy.get('@purchaseSectionInfo').should('have.not.css', 'display', 'none');
      cy.get('@purchaseSectionDetail').should(
        'have.not.css',
        'display',
        'none'
      );
    });
    it('당첨번호 입력폼이 보여야한다.', () => {
      cy.get('@winnerNumInput').should('have.not.css', 'display', 'none');
    });

    it(`${TEST.AMOUNT_LOTTO(TEST.PROPER_PRICE)}개의 로또가 있어야한다`, () => {
      cy.get('#lotto-lists')
        .find('div')
        .should('have.length', TEST.AMOUNT_LOTTO(TEST.PROPER_PRICE));
    });
  });

  context(`로또 구입 후 번호보기 버튼 누름`, () => {
    beforeEach(() => {
      cy.get('@purchaseInput').type(TEST.PROPER_PRICE).type('{enter}');
      cy.get('#lotto-switch').click({ force: true });
    });

    it(`로또들이 세로로 정렬되어야한다`, () => {
      cy.get('#lotto-lists').should('have.class', 'flex-col');
    });

    it(`번호보기 버튼을 다시 누르면 가로로 정렬되어야한다`, () => {
      cy.get('#lotto-switch').click({ force: true });
      cy.get('#lotto-lists').should('have.not.class', 'flex-col');
    });

    it(`구입한 로또들은 올바른 번호를 가지고 있어야한다.`, () => {
      cy.get('#lotto-lists')
        .find('div')
        .each(($div) => {
          expect(
            $div
              .find('#lotto-num')
              .text()
              .split(', ')
              .every((num) => num > 0 && num < 46)
          ).to.be.true;
        });
    });
  });

  context(`로또 구입 후 당첨번호 입력`, () => {
    beforeEach(() => {
      cy.get('@purchaseInput').type(TEST.PROPER_PRICE).type('{enter}');
      cy.get('#winner-num-input-wrapper')
        .find('input[type="number"]')
        .then(($inputs) => {
          [...$inputs].forEach(($input, idx) =>
            cy.wrap($input).type(TEST.WINNER_NUMS[idx])
          );
        });
      cy.get('#winner-num-submitBtn').click();
    });

    it('당첨번호를 전부 채우면 모달창 생성', () => {
      cy.get('@modal').should('have.class', 'open');
    });
  });

  context(`모달 결과창 검증`, () => {
    beforeEach(() => {
      cy.get('@purchaseInput').type(TEST.ONE_TICKET).type('{enter}');
      cy.get('#lotto-switch').click({ force: true });
    });

    it('6개 일치 결과 갯수,', () => {
      cy.get('#lotto-lists')
        .find('div')
        .eq(0)
        .then(($div) => {
          const matchSix = getMatchNum($div, 6);

          cy.get('#winner-num-input-wrapper')
            .find('input[type="number"]')
            .then(($inputs) => {
              [...$inputs].forEach(($input, idx) =>
                cy.wrap($input).type(matchSix[idx])
              );
            });
        });
      cy.get('#winner-num-submitBtn').click();

      cy.get('#modal-table tbody')
        .children()
        .each(($tr, idx) => {
          const count = $tr.find('#modal-count').text();
          if (idx === VALUE.COUNT.MATCH_COUNT_SIX_IDX) {
            expect(count).to.equal('1개');
          } else {
            expect(count).to.equal('0개');
          }
        });

      cy.get('#modal #modal-profit-rate').should(
        'have.text',
        `당신의 총 수익률은 ${getProfitRate(
          LOTTO_PRICES[VALUE.COUNT.MATCH_COUNT_SIX_IDX].price,
          TEST.ONE_TICKET
        )} %입니다.`
      );
    });

    it('5개 일치 + 보너스 볼 결과 갯수,', () => {
      cy.get('#lotto-lists')
        .find('div')
        .eq(0)
        .then(($div) => {
          const matchFiveWithBonus = getMatchFiveWithBonus($div);

          cy.get('#winner-num-input-wrapper')
            .find('input[type="number"]')
            .then(($inputs) => {
              [...$inputs].forEach(($input, idx) =>
                cy.wrap($input).type(matchFiveWithBonus[idx])
              );
            });
        });
      cy.get('#winner-num-submitBtn').click();

      cy.get('#modal-table tbody')
        .children()
        .each(($tr, idx) => {
          const count = $tr.find('#modal-count').text();
          if (idx === VALUE.COUNT.BONUS_IDX) {
            expect(count).to.equal('1개');
          } else {
            expect(count).to.equal('0개');
          }
        });

      cy.get('#modal #modal-profit-rate').should(
        'have.text',
        `당신의 총 수익률은 ${getProfitRate(
          LOTTO_PRICES[VALUE.COUNT.BONUS_IDX].price,
          TEST.ONE_TICKET
        )} %입니다.`
      );
    });

    it('5개 일치 결과 갯수,', () => {
      cy.get('#lotto-lists')
        .find('div')
        .eq(0)
        .then(($div) => {
          const matchFive = getMatchNum($div, 5);

          cy.get('#winner-num-input-wrapper')
            .find('input[type="number"]')
            .then(($inputs) => {
              [...$inputs].forEach(($input, idx) =>
                cy.wrap($input).type(matchFive[idx])
              );
            });
        });
      cy.get('#winner-num-submitBtn').click();

      cy.get('#modal-table tbody')
        .children()
        .each(($tr, idx) => {
          const count = $tr.find('#modal-count').text();
          if (idx === VALUE.COUNT.MATCH_COUNT_FIVE_IDX) {
            expect(count).to.equal('1개');
          } else {
            expect(count).to.equal('0개');
          }
        });

      cy.get('#modal #modal-profit-rate').should(
        'have.text',
        `당신의 총 수익률은 ${getProfitRate(
          LOTTO_PRICES[VALUE.COUNT.MATCH_COUNT_FIVE_IDX].price,
          TEST.ONE_TICKET
        )} %입니다.`
      );
    });

    it('4개 일치 결과 갯수,', () => {
      cy.get('#lotto-lists')
        .find('div')
        .eq(0)
        .then(($div) => {
          const matchFour = getMatchNum($div, 4);

          cy.get('#winner-num-input-wrapper')
            .find('input[type="number"]')
            .then(($inputs) => {
              [...$inputs].forEach(($input, idx) =>
                cy.wrap($input).type(matchFour[idx])
              );
            });
        });
      cy.get('#winner-num-submitBtn').click();

      cy.get('#modal-table tbody')
        .children()
        .each(($tr, idx) => {
          const count = $tr.find('#modal-count').text();
          if (idx === VALUE.COUNT.MATCH_COUNT_FOUR_IDX) {
            expect(count).to.equal('1개');
          } else {
            expect(count).to.equal('0개');
          }
        });

      cy.get('#modal #modal-profit-rate').should(
        'have.text',
        `당신의 총 수익률은 ${getProfitRate(
          LOTTO_PRICES[VALUE.COUNT.MATCH_COUNT_FOUR_IDX].price,
          TEST.ONE_TICKET
        )} %입니다.`
      );
    });

    it('3개 일치 결과 갯수,', () => {
      cy.get('#lotto-lists')
        .find('div')
        .eq(0)
        .then(($div) => {
          const matchThree = getMatchNum($div, 3);

          cy.get('#winner-num-input-wrapper')
            .find('input[type="number"]')
            .then(($inputs) => {
              [...$inputs].forEach(($input, idx) =>
                cy.wrap($input).type(matchThree[idx])
              );
            });
        });
      cy.get('#winner-num-submitBtn').click();

      cy.get('#modal-table tbody')
        .children()
        .each(($tr, idx) => {
          const count = $tr.find('#modal-count').text();
          if (idx === VALUE.COUNT.MATCH_COUNT_THREE_IDX) {
            expect(count).to.equal('1개');
          } else {
            expect(count).to.equal('0개');
          }
        });

      cy.get('#modal #modal-profit-rate').should(
        'have.text',
        `당신의 총 수익률은 ${getProfitRate(
          LOTTO_PRICES[VALUE.COUNT.MATCH_COUNT_THREE_IDX].price,
          TEST.ONE_TICKET
        )} %입니다.`
      );
    });

    it('당첨이 되지 않았을 경우', () => {
      cy.get('#lotto-lists')
        .find('div')
        .eq(0)
        .then(($div) => {
          const matchOne = getMatchNum($div, 1);

          cy.get('#winner-num-input-wrapper')
            .find('input[type="number"]')
            .then(($inputs) => {
              [...$inputs].forEach(($input, idx) =>
                cy.wrap($input).type(matchOne[idx])
              );
            });
        });
      cy.get('#winner-num-submitBtn').click();

      cy.get('#modal-table tbody')
        .children()
        .each(($tr) => {
          const count = $tr.find('#modal-count').text();

          expect(count).to.equal('0개');
        });

      cy.get('#modal #modal-profit-rate').should(
        'have.text',
        `당신의 총 수익률은 ${getProfitRate(0, TEST.ONE_TICKET)} %입니다.`
      );
    });
  });

  context('모달 버튼 기능 검증', () => {
    beforeEach(() => {
      cy.get('@purchaseInput').type(TEST.PROPER_PRICE).type('{enter}');
      cy.get('#winner-num-input-wrapper')
        .find('input[type="number"]')
        .then(($inputs) => {
          [...$inputs].forEach(($input, idx) =>
            cy.wrap($input).type(TEST.WINNER_NUMS[idx])
          );
        });
      cy.get('#winner-num-submitBtn').click();
    });
    it('X버튼을 눌렀을 때 모달이 닫혀야함', () => {
      cy.get('#modal-close').click();
      cy.get('@modal').should('have.not.class', 'open');
    });

    it('다시 시작 버튼을 눌렀을 때 모달이 닫히고, 리셋이 됨', () => {
      cy.get('#reset-btn').click();
      cy.get('@modal').should('have.not.class', 'open');
      cy.get('@purchaseSectionInfo').should('have.css', 'display', 'none');
      cy.get('@purchaseSectionDetail').should('have.css', 'display', 'none');
      cy.get('@winnerNumInput').should('have.css', 'display', 'none');
    });
  });
});
