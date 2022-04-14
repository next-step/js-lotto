import { ERROR_MESSAGES, NUMBER } from '../../src/js/constants';
import { isRangeNumberInLotto } from '../../src/js/utils';

const handleInputPrice = (price) => cy.get('#form-price input[type=number]').type(price);
const handlePurchaseLotto = (price) => {
  handleInputPrice(price);
  cy.get('#form-price button[type=submit]').click();
};
const handleInputLottoNumbers = ({ target, numbers }) => {
  target.within(() => {
    numbers.forEach((number, index) => {
      cy.get('input').eq(index).type(number);
    });
  });
};
const addNumber = (numbers) => {
  const lotto = new Set(numbers);
  while (lotto.size < NUMBER.LOTTO_LENGTH + 1) {
    const num = Math.floor(Math.random() * 44) + 1;
    lotto.add(num);
  }
  return [...lotto];
};

const changeNumber = ({ numbers, changeCount }) => {
  const lotto = new Set(numbers.slice(changeCount));
  while (lotto.size < NUMBER.LOTTO_LENGTH + 1) {
    const num = Math.floor(Math.random() * 44) + 1;
    if (numbers.includes(num)) {
      continue;
    }
    lotto.add(num);
  }
  return [...lotto];
};

describe('로또 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('첫화면 렌더링 시에, 로또리스트, 당첨번호 form 비노출, 수동구매 form 비노출', () => {
    cy.get('#lotto-manual-purchase').should('not.be.visible');
    cy.get('#lotto-list-container').should('not.be.visible');
    cy.get('#form-winning').should('not.be.visible');
  });

  context('로또 금액 입력이 잘못된 경우에 따른 경고창 노출', () => {
    it('로또 금액 입력 없이 확인 버튼 클릭할 때 경고창 노출', () => {
      cy.on('window:alert', cy.stub().as('alerted'));

      cy.get('#form-price button[type=submit]').click();
      cy.get('@alerted').should('have.been.calledOnce').and('have.been.calledWith', ERROR_MESSAGES.EMPTY_MONEY);
    });
    it('로또 금액을 1,000원 이하로 구매하는 경우 경고창 노출', () => {
      handleInputPrice(500);
      cy.on('window:alert', cy.stub().as('alerted'));

      cy.get('#form-price button[type=submit]').click();
      cy.get('@alerted').should('have.been.calledOnce').and('have.been.calledWith', ERROR_MESSAGES.MIN_PRICE);
    });
    it('로또 금액을 100,000원 초과로 구매하는 경우 경고창 노출', () => {
      handleInputPrice(100001);
      cy.on('window:alert', cy.stub().as('alerted'));

      cy.get('#form-price button[type=submit]').click();
      cy.get('@alerted').should('have.been.calledOnce').and('have.been.calledWith', ERROR_MESSAGES.MAX_PRICE);
    });
    it('로또 금액단위가 맞지않는 경우 경고창 노출', () => {
      handleInputPrice(2022);
      cy.on('window:alert', cy.stub().as('alerted'));

      cy.get('#form-price button[type=submit]').click();
      cy.get('@alerted').should('have.been.calledOnce').and('have.been.calledWith', ERROR_MESSAGES.BUY_UNIT);
    });
  });

  context('수동 구매 금액 입력이 잘못된 경우에 따른 경고창 노출', () => {
    it('수동 구매 번호를 중복 입력한 경우', () => {
      cy.on('window:alert', cy.stub().as('alerted'));

      handlePurchaseLotto(3000);
      cy.get('#lotto-manual-purchase').should('be.visible');
      cy.get('#lotto-manual-purchase button.manual-purchase-btn').click();
      handleInputLottoNumbers({ target: cy.get('#lotto-manual-list'), numbers: [1, 1, 1, 1, 1, 1] });
      cy.get('#lotto-manual-purchase button[type=submit]').click();
      cy.get('@alerted').should('have.been.calledOnce').and('have.been.calledWith', ERROR_MESSAGES.DUPLICATED_NUMBER);
    });
  });

  context('로또 금액이 정상적으로 입력된 경우', () => {
    it('수동 구매 성공시 로또 수량, 로또 아이콘, 당첨금 확인 form 표시', () => {});
    it('자동 구매 성공시 로또 수량, 로또 아이콘, 당첨금 확인 form 표시', () => {
      handlePurchaseLotto(3000);
      cy.get('#lotto-manual-purchase').should('be.visible');
      cy.get('#lotto-manual-purchase button[type=submit]').click();
      cy.get('#lotto-list').should('be.visible');
      cy.get('#form-winning').should('be.visible');
      cy.get('li.lotto-list-item').should('have.length', 3);
      cy.get('label[data-lotto="count-label"]').contains(3);
    });
    it('수동 + 자동 구매 성공시 로또 수량, 로또 아이콘, 당첨금 확인 form 표시', () => {});
  });

  context('로또 구매 이후 번호보기 토글버튼 클릭한 경우', () => {
    it('6개의 로또번호 숫자가 중복되지 않는지 확인', () => {
      handlePurchaseLotto(3000);
      cy.get('#lotto-manual-purchase').should('be.visible');
      cy.get('#lotto-manual-purchase button[type=submit]').click();
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
    it('중복되는 번호를 입력한 경우', () => {
      cy.on('window:alert', cy.stub().as('alerted'));

      handlePurchaseLotto(1000);
      cy.get('#lotto-manual-purchase').should('be.visible');
      cy.get('#lotto-manual-purchase button[type=submit]').click();

      handleInputLottoNumbers({ target: cy.get('#form-winning'), numbers: [1, 1, 1, 1, 1, 1, 1] });
      cy.get('#form-winning button[type=submit]').click();
      cy.get('@alerted').should('have.been.calledOnce').and('have.been.calledWith', ERROR_MESSAGES.DUPLICATED_NUMBER);
    });
  });

  context('결과 확인 버튼 클릭시 모달 등장 당첨통계 수익률 표시', () => {
    it('1등 당첨한 경우', () => {
      handlePurchaseLotto(1000);
      cy.get('#lotto-manual-purchase').should('be.visible');
      cy.get('#lotto-manual-purchase button[type=submit]').click();

      cy.get('#lotto-list ul li span.lotto-detail').then(($span) => {
        const lottoNumbers = $span.text().split(', ').map(Number);
        const lottoNumbersWithBonus = addNumber(lottoNumbers);
        handleInputLottoNumbers({ target: cy.get('#form-winning'), numbers: lottoNumbersWithBonus });

        cy.get('#form-winning button[type="submit"]').click();
        cy.get('.modal').should('be.visible');
        cy.get('.modal tr').eq(5).should('contain', '1개');
        cy.get('.modal p').should('have.text', '당신의 총 수익률은 199999900%입니다.');
      });
    });

    it('2등 당첨한 경우', () => {
      handlePurchaseLotto(1000);
      cy.get('#lotto-manual-purchase').should('be.visible');
      cy.get('#lotto-manual-purchase button[type=submit]').click();

      cy.get('#lotto-list ul li span.lotto-detail').then(($span) => {
        const _lottoNumbers = $span.text().split(', ').map(Number);
        const lottoNumbers = addNumber(_lottoNumbers);
        const temp = lottoNumbers[5];
        lottoNumbers[5] = lottoNumbers[6];
        lottoNumbers[6] = temp;

        handleInputLottoNumbers({ target: cy.get('#form-winning'), numbers: lottoNumbers });
      });
      cy.get('#form-winning button[type="submit"]').click();
      cy.get('.modal').should('be.visible');
      cy.get('.modal tr').eq(4).should('contain', '1개');
      cy.get('.modal p').should('have.text', '당신의 총 수익률은 2999900%입니다.');
    });

    it('3등 당첨한 경우', () => {
      handlePurchaseLotto(1000);
      cy.get('#lotto-manual-purchase').should('be.visible');
      cy.get('#lotto-manual-purchase button[type=submit]').click();

      cy.get('#lotto-list ul li span.lotto-detail').then(($span) => {
        const _lottoNumbers = $span.text().split(', ').map(Number);
        const lottoNumbersWithBonus = changeNumber({ numbers: _lottoNumbers, changeCount: 1 });
        handleInputLottoNumbers({ target: cy.get('#form-winning'), numbers: lottoNumbersWithBonus });
      });
      cy.get('#form-winning button[type="submit"]').click();

      cy.get('.modal').should('be.visible');
      cy.get('.modal tr').eq(3).should('contain', '1개');
      cy.get('.modal p').should('have.text', '당신의 총 수익률은 149900%입니다.');
    });

    it('4등 당첨한 경우', () => {
      handlePurchaseLotto(1000);
      cy.get('#lotto-manual-purchase').should('be.visible');
      cy.get('#lotto-manual-purchase button[type=submit]').click();

      cy.get('#lotto-list ul li span.lotto-detail').then(($span) => {
        const _lottoNumbers = $span.text().split(', ').map(Number);
        const lottoNumbersWithBonus = changeNumber({ numbers: _lottoNumbers, changeCount: 2 });
        handleInputLottoNumbers({ target: cy.get('#form-winning'), numbers: lottoNumbersWithBonus });
      });
      cy.get('#form-winning button[type="submit"]').click();

      cy.get('.modal').should('be.visible');
      cy.get('.modal tr').eq(2).should('contain', '1개');
      cy.get('.modal p').should('have.text', '당신의 총 수익률은 4900%입니다.');
    });

    it('5등 당첨한 경우', () => {
      handlePurchaseLotto(1000);
      cy.get('#lotto-manual-purchase').should('be.visible');
      cy.get('#lotto-manual-purchase button[type=submit]').click();

      cy.get('#lotto-list ul li span.lotto-detail').then(($span) => {
        const _lottoNumbers = $span.text().split(', ').map(Number);
        const lottoNumbersWithBonus = changeNumber({ numbers: _lottoNumbers, changeCount: 3 });
        handleInputLottoNumbers({ target: cy.get('#form-winning'), numbers: lottoNumbersWithBonus });
      });
      cy.get('#form-winning button[type="submit"]').click();

      cy.get('.modal').should('be.visible');
      cy.get('.modal tr').eq(1).should('contain', '1개');
      cy.get('.modal p').should('have.text', '당신의 총 수익률은 400%입니다.');
    });
  });

  context('당첨번호가 정상적으로 입력된 경우', () => {
    it('모달에서 닫기버튼 누르면 모달 숨기기', () => {
      handlePurchaseLotto(1000);
      cy.get('#lotto-manual-purchase').should('be.visible');
      cy.get('#lotto-manual-purchase button[type=submit]').click();

      cy.get('#lotto-list ul li span.lotto-detail').then(($span) => {
        const lottoNumbers = $span.text().split(', ').map(Number);
        const lottoNumbersWithBonus = addNumber(lottoNumbers);
        handleInputLottoNumbers({ target: cy.get('#form-winning'), numbers: lottoNumbersWithBonus });
      });
      cy.get('#form-winning button[type="submit"]').click();

      cy.get('.modal').should('be.visible');
      cy.get('.modal .modal-close').click();
      cy.get('.modal').should('be.not.visible');
    });

    it('모달에서 다시시작 버튼 눌렀을 때 초기화', () => {
      handlePurchaseLotto(1000);
      cy.get('#lotto-manual-purchase').should('be.visible');
      cy.get('#lotto-manual-purchase button[type=submit]').click();

      cy.get('#lotto-list ul li span.lotto-detail').then(($span) => {
        const lottoNumbers = $span.text().split(', ').map(Number);
        const lottoNumbersWithBonus = addNumber(lottoNumbers);
        handleInputLottoNumbers({ target: cy.get('#form-winning'), numbers: lottoNumbersWithBonus });
      });
      cy.get('#form-winning button[type="submit"]').click();

      cy.get('.modal').should('be.visible');
      cy.get('.modal button').click();
      cy.get('#lotto-list').should('not.be.visible');
      cy.get('#form-winning').should('not.be.visible');
      cy.get('#form-price input').should('have.text', '');
    });
  });
});
