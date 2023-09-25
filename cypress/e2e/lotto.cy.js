describe('Lotto', () => {
  let alertStub;

  beforeEach(() => {
    cy.visit('http://localhost:9000');
    alertStub = cy.stub();
    cy.on('window:alert', alertStub);
  });

  describe('로또 구매', () => {
    it('로또 구매 전에는 구매한 로또 확인 및 당첨 번호, 보너스 번호를 입력할 수 없다.', () => {
      cy.shouldInvisible('.purchased-lottos');
      cy.shouldInvisible('.input-lotto-nums');
    });

    it('로또 구매 금액이 천원 단위가 아닐 경우 경고창이 뜬다.', () => {
      cy.purchaseLottos('300');

      cy.then(() => {
        expect(alertStub).to.be.calledWith(
          '로또 구입 금액을 1000원 단위로 입력해 주세요.'
        );
      });
    });
  });

  describe('로또 구매 번호 확인', () => {
    const amount = 3000;

    beforeEach(() => {
      cy.purchaseLottos(amount);
    });

    it('로또를 구매하면 구매한 로또 개수를 확인할 수 있다.', () => {
      cy.shouldVisible('.purchased-lottos');
      cy.get('.total-purchased').should(
        'contain',
        `${amount / 1000}개를 구매하였습니다.`
      );
      cy.get('.lotto-icons').children().should('have.length', 3);
    });

    it('번호 보기 토글을 한 번 클릭하면 구매한 로또 번호를 확인할 수 있다.', () => {
      cy.clickToggle();

      cy.shouldExist('.lotto-numbers');
    });

    it('번호 보기 토글을 한 번 더 클릭하면 번호는 화변에서 보이지 않는다.', () => {
      cy.clickToggle();
      cy.clickToggle();

      cy.shouldNotExist('.lotto-numbers');
    });
  });

  describe('당첨번호 및 보너스 번호 입력', () => {
    beforeEach(() => {
      cy.purchaseLottos('5000');
    });

    it('로또를 구매하면 당첨 번호, 보너스 번호를 입력할 수 있다.', () => {
      cy.shouldVisible('.input-lotto-nums');
    });

    it('당첨번호 혹은 보너스 번호가 빈문자열이면 경고창이 뜬다.', () => {
      cy.clickResultButton();

      cy.then(() => {
        expect(alertStub).to.be.calledWith('로또 번호는 정수이어야 합니다.');
      });
    });

    it('당첨번호 혹은 보너스 번호가 1~45 범위가 아니면 경고창이 뜬다.', () => {
      const winningNumbers = [-1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      cy.inputWinningNumbers({ winningNumbers, bonusNumber });

      cy.clickResultButton();

      cy.then(() => {
        expect(alertStub).have.been.calledWith(
          '로또 번호는 1이상 45이하 정수이어야 합니다.'
        );
      });
    });

    it('당첨번호 혹은 보너스 번호 중 중복된 숫자가 있으면 경고창이 뜬다', () => {
      const winningNumbers = [2, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      cy.inputWinningNumbers({ winningNumbers, bonusNumber });

      cy.clickResultButton();

      cy.then(() => {
        expect(alertStub).have.been.calledWith(
          '로또 번호는 중복되면 안됩니다.'
        );
      });
    });
  });

  describe('당첨 결과 확인', () => {
    beforeEach(() => {
      cy.purchaseLottos('5000');
    });

    it('당첨 번호와 보너스 번호를 입력하고 결과보기를 누르면 당첨 결과 모달창이 뜬다', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      cy.inputWinningNumbers({ winningNumbers, bonusNumber });

      cy.clickResultButton();

      cy.shouldVisible('.modal');

      cy.get('.modal').children().should('contain', '당첨 통계');
      cy.get('.modal').children().should('contain', '총 수익률');
    });
  });

  describe('다시 시작하기', () => {
    beforeEach(() => {
      cy.purchaseLottos('5000');
    });

    it('다시 시작하기 버튼을 클릭하면 빈 로또 구매 입력창만 존재한다', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      cy.inputWinningNumbers({ winningNumbers, bonusNumber });

      cy.clickResultButton();

      cy.clickRestartButton();

      cy.shouldInvisible('.purchased-lottos');
      cy.shouldInvisible('.input-lotto-nums');
      cy.shouldInvisible('.modal');

      cy.get('.input-price').should('not.have.value');
    });
  });
});
