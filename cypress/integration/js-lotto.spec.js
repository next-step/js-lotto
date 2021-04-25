import { checkLottos, calcEarningRate } from '../../src/js/utils.js';
import { NUMBERS, MESSAGES } from '../../src/js/constants.js';

describe("js-lotto", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    const inputPrice = ({ purchasedPrice }) => {
        cy.get('#input-price').type(purchasedPrice);
        cy.get('#input-price-form').submit();
        return purchasedPrice / NUMBERS.UNIT;
    };

    const inputLottoNums = ({ lottoNums }) => {
        lottoNums.forEach((num, idx) => {
            cy.get(`.winning-number[data-index-num="${idx}"]`).focus().type(num);
        });
        cy.get('#input-lotto-nums').submit();
    };

    const runLottoGame = ({ purchasedPrice, lottoNums }) => {
        inputPrice({ purchasedPrice });
        inputLottoNums({ lottoNums });

        cy.get('.lotto-detail')
            .then(details => {
                const lottos = [];
                details.each((_, el) => lottos.push(el.innerText.split(', ').map(num => +num)));
                return lottos;
            })
            .then((lottos) => {
                const winLottos = checkLottos(lottos, lottoNums);
                const earningRate = calcEarningRate(purchasedPrice, winLottos);
                return { winLottos, earningRate };
            })
            .then(({ winLottos, earningRate }) => {
                [...winLottos].forEach(([matcingCount, prizeCount]) => {
                    cy.get(`.match-count[data-count="${matcingCount}"]`).should("have.text", prizeCount);
                });
                cy.get('#profit').should("have.text", earningRate);
            });
    };

    it("구입할 금액을 입력한다.", () => {
        inputPrice({ purchasedPrice: 10000 });
    });

    it("구입할 금액은 1,000 단위로 입력할 수 있다.", () => {
        inputPrice({ purchasedPrice: 11111 });
        cy.on("window:alert", (txt) => expect(txt).to.contains(MESSAGES.INVALID_PRICE));
    });

    it("입력한 금액만큼 로또를 발급한다.", () => {
        const lottosLength = inputPrice({ purchasedPrice: 10000 });
        cy.get('#lotto-icons').find('li').should('have.length', lottosLength);
    });

    it("번호 보기 활성화 시 구매 된 번호를 확인한다.", () => {
        inputPrice({ purchasedPrice: 10000 });
        cy.get('.switch').click();
        cy.get('#lotto-icons').should('have.class', 'flex-col');
        cy.get('.lotto-detail').should('have.attr', 'style', 'display: inline;');
    });

    it("당첨 번호를 입력한다.", () => {
        inputPrice({ purchasedPrice: 10000 });
        inputLottoNums({ lottoNums: [2, 18, 24, 30, 32, 45, 14] });
    });

    it("당첨 개수와 수익률을 표시한다.", () => {
        const lottoNums = [2, 18, 24, 30, 32, 45, 14];
        runLottoGame({ purchasedPrice: 100000, lottoNums });
    });

    it("다시 하기", () => {
        const lottoNums = [2, 18, 24, 30, 32, 45, 14];
        runLottoGame({ purchasedPrice: 5000, lottoNums });
        cy.get('#reset-btn').click();
        runLottoGame({ purchasedPrice: 10000, lottoNums });
        cy.get('#reset-btn').click();
        runLottoGame({ purchasedPrice: 50000, lottoNums });
    });
});
