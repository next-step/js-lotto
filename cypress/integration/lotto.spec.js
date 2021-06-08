describe('racing-car', () => {
    beforeEach(() => {
        // 페이지 접속. 띄워진 서버 port를 작성해주세요.
        cy.visit('http://localhost:5500/');
    });

    describe('구입 기능', () => {
        it('금액을 입력하지 않으면 구매 불가능 ', () => {
            cy.get('#input-price-btn').click();
            cy.on('window:alert', (str) => {
                expect(str).to.equal('로또 구입 금액을 입력해 주세요.');
            });
        });
        it('1000원 미만만 구매 불가능', () => {
            cy.purchaseLotto(900);
            cy.on('window:alert', (str) => {
                expect(str).to.equal('로또 구입 금액은 최소 1000원 최대 100,000원 입니다.');
            });
        });
        it('1000원 이상만 구매 가능', () => {
            cy.purchaseLotto(1000);
            cy.get('#purchased-lottos').should('have.css', 'visibility', 'visible');
        });
        it('최대 100000원 까지 구매 가능', () => {
            cy.purchaseLotto(1000000);
            cy.on('window:alert', (str) => {
                expect(str).to.equal('로또 구입 금액은 최소 1000원 최대 100,000원 입니다.');
            });
        });
        describe('1000원 단위만 구매 가능', () => {
            it('1234 입력', () => {
                cy.purchaseLotto(1234);
                cy.on('window:alert', (str) => {
                    expect(str).to.equal('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
                });
            });
            it('4000 입력', () => {
                cy.purchaseLotto(4000);
                cy.get('#purchased-lottos').should('have.css', 'visibility', 'visible');
            });
        });
        describe('생성된 로또 보여주기', () => {
            it('금액만큼 로또 아이콘 생성', () => {
                cy.purchaseLotto(5000);
                cy.get('#lotto-icons').find('.lotto-icon').should('have.length', 5);
            });
            it('번호보기 토글 누르면 번호 볼 수 있다.', () => {
                cy.purchaseLotto(5000);
                cy.get('.switch').click();
                cy.get('.lotto-detail').should('have.css', 'display', 'inline');
            });
        });
    });

    describe('당첨 번호', () => {
        it('1-45 의 값만 입력 가능', () => {
            cy.purchaseLotto(5000);
            cy.inputWinningNumbers(['1', '22', '33', '44', '11', '23', '50']);

            cy.on('window:alert', (str) => {
                expect(str).to.equal('로또 번호는 1이상 45이하의 숫자만 입력할 수 있습니다.');
            });
        });
        it('중복되는 값 입력 불가', () => {
            cy.purchaseLotto(5000);
            cy.inputWinningNumbers(['22', '22', '33', '44', '11', '12', '34']);

            cy.on('window:alert', (str) => {
                expect(str).to.equal('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
            });
        });
    });

    describe('당첨 결과 기능', () => {
        it('결과', () => {
            cy.purchaseLotto(5000);
            cy.inputWinningNumbers(['2', '12', '22', '32', '42', '13', '24']);

            cy.get('.modal').should('class', 'modal open');
        });
    });
});
