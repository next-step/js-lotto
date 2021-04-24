import { contentType } from "mime-types";
import { MESSAGE, FUNC, BALL } from "../../src/js/constant.js";
import { checkTicketRank } from "../../src/js/countWinningTicket.js";

describe("racing", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  const inputMoneyActivity = (amount, isAlert, isSuccess) => {
    cy.window().then((win) => cy.stub(win, "alert").as("windowAlert"));
    cy.get("form.mt-5>div>input").type(amount);
    cy.get("form.mt-5>div>button").click();
    if (isAlert) {
      cy.get("@windowAlert").should("be.calledWith", MESSAGE.MONEY_UNIT);
    }
    if (!isSuccess) {
      cy.get(".lotto-section").should("not.exist");
      cy.get(".inputnum-section").should("not.exist");
    } else {
      cy.get(".lotto-section").should("be.exist");
      cy.get(".inputnum-section").should("be.exist");
    }
  };

  const checkLottoDisplay = (amount) => {
    cy.get("#amount-display").find("label").then((x) => {
        let html = x[0].innerHTML;
        let str = `총 ${parseInt(amount) / 1000}개를 구매하였습니다.`
        expect(html).to.equal(str);
    })
    cy.get("#ticket-display").find(".lotto-wrapper").then((x)=>{
      expect(x.length).to.equal(parseInt(amount / 1000));
    })
  }

  const checkToggleButton = (status) => {
    cy.get(".lotto-numbers-toggle-button").click({force: true}).then(() => {
      cy.get(".lotto-detail").then((x) => {
        let checkDisplay = true;
        for(let i = 0; i < x.length; i++){
          checkDisplay = x[i].style.display == status ? true : false;
        }
        expect(checkDisplay).to.equal(true);
      })
    })
  }

  const checkModalDisplay = (checkCase, lastWeek) => {
    cy.get(".lotto-detail").then((x) => {
      let lottoNums = [];
      for(let i = 0; i < x.length; i++){
        lottoNums.push(x[i].innerHTML.split(", "));
      }
      if(!checkCase){
        checkByTicketsNumbers(lottoNums);
      } else{
        checkByLastWeekNumbers(lottoNums, lastWeek);
      }
    })
  }

  const inputLottoNumbers = (ary) => {
    let bonus = 0;

    cy.get(".winning-number").then((x) => {
      ary.forEach((v, i) => {
          cy.wrap(x[i]).type(v);
      });
    })

    do {
      bonus = FUNC.getRandomVal(BALL.MIN, BALL.MAX);
    } while (ary.includes(bonus))
    return bonus;
  }

  const clearLottoNumbers = () => {
    cy.get(".winning-number").then((x) => {
      [...x].forEach((v, i) => {
        cy.wrap(v).clear();
      })
    })
    cy.get(".bonus-number").clear();
  }

  const checkMatchCount = (lottoNums, curNums, bonus_num) => {
    let matchRanks = [0, 0, 0, 0, 0];
    lottoNums.forEach((x) => {
      let match = 0;
      let bonus = false;
      x.forEach((v) => {
        v = parseInt(v)
        if (curNums.includes(v)) match++;
        if (v == bonus_num) bonus = true;
      });
      checkTicketRank(matchRanks, match, bonus);
    });
    return matchRanks;
  }

  const compareModal = (matched, investment) => {
    const lottoRewards = [5000, 50000, 1500000, 30000000, 2000000000];
    let profit = 0;
    cy.get(".match-count").then((x) => {
      [...x].forEach((v, i) => {
        expect(v.innerHTML).to.equal(`${matched[i]}개`);
        profit += matched[i] * lottoRewards[i];
      })
      profit = Math.floor(((profit - investment) / investment) * 100);
      cy.get(".display-profit").then((x) => {
        let html = x[0].innerHTML;
        let str = `당신의 총 수익률은 ${profit}% 입니다.`;
        expect(html).to.equal(str);
      })
    }) 
    
  }

  const checkByTicketsNumbers = (lottoNums) => {
    for(let i = 0; i < lottoNums.length; i++)
      {
        let bonus = inputLottoNumbers(lottoNums[i]);
        cy.get(".bonus-number").type(bonus);
        let matched = checkMatchCount(lottoNums, lottoNums[i], bonus);

        cy.get(".open-result-modal-button").click();
        cy.get(".modal").should("have.class", "open");
        compareModal(matched, lottoNums.length * 1000);
        cy.get(".modal-close").click();
        cy.get(".modal").should("not.have.class", "open");
        clearLottoNumbers();
      }
  }

  const checkByLastWeekNumbers = (lottoNums, ary) => {
    let bonus = ary.splice(6)[0];
    inputLottoNumbers(ary);
    cy.get(".bonus-number").type(bonus);
    let matched = checkMatchCount(lottoNums, ary, bonus);

    cy.get(".open-result-modal-button").click();
    cy.get(".modal").should("have.class", "open");
    compareModal(matched, lottoNums.length * 1000);
    cy.get(".modal-close").click();
    cy.get(".modal").should("not.have.class", "open");
  }

  const pressRestartButton = () => {
    cy.get(".open-result-modal-button").click();
    cy.get(".modal").should("have.class", "open");
    cy.get(".btn-restart").click();

    cy.get(".lotto-section").should("not.exist");
    cy.get(".inputnum-section").should("not.exist");
  }

  let amount;

  describe("금액 입력 관련", () => {
    it("Case 1 - 금액이 1000 원 보다 낮은 경우", () => {
        amount = "100";
      inputMoneyActivity(amount, 0, 0);
    });

    it("Case 2 - 금액이 100000 원 보다 높은 경우", () => {
        amount = "120000";
      inputMoneyActivity(amount, 0, 0);
    });

    it("Case 3 - 금액이 범위에 맞지만 1000원 단위로 나누어 떨어지지 않는 경우", () => {
        amount = "5500";
      inputMoneyActivity(amount, 1, 0);
    });

    it("Case 4 - 숫자가 아닌 값을 입력하는 경우", () => {
        amount = "ABC";
      inputMoneyActivity(amount, 0, 0);
    });

    it("Case 5 - 정상적인 숫자를 입력하는 경우", () => {
        amount = "7000";
      inputMoneyActivity(amount, 0, 1);
    });
  });

  describe("로또 구매 후 출력 체크", () => {
    it("Case 1 - 1000원 어치 구매", () => {
        amount = "1000"
        inputMoneyActivity(amount, 0, 1);
        checkLottoDisplay(amount);
        checkToggleButton("inline");
        checkToggleButton("none");
        checkModalDisplay(1, [2, 18, 24, 30, 32, 45, 14]);
        pressRestartButton();
    });
    
    it("Case 2 - 8000원 어치 구매", () => {
        amount = "8000"
        inputMoneyActivity(amount, 0, 1);
        checkLottoDisplay(amount);
        checkToggleButton("inline");
        checkToggleButton("none");
        checkModalDisplay(1, [2, 18, 24, 30, 32, 45, 14]);
        pressRestartButton();
    });

    it("Case 3 - 30000원 어치 구매", () => {
      amount = "30000"
      inputMoneyActivity(amount, 0, 1);
      checkLottoDisplay(amount);
      checkToggleButton("inline");
      checkToggleButton("none");
      checkModalDisplay(1, [2, 18, 24, 30, 32, 45, 14]);
      pressRestartButton();
    });

    it("Case 4 - 100000원 어치 구매", () => {
      amount = "100000"
      inputMoneyActivity(amount, 0, 1);
      checkLottoDisplay(amount);
      checkToggleButton("inline");
      checkToggleButton("none");
      checkModalDisplay(1, [2, 18, 24, 30, 32, 45, 14]);
      pressRestartButton();
    });

    it("Case 5 - 중복된 번호를 입력하는 경우", () => {
      amount = "1000"
      inputMoneyActivity(amount, 0, 1);
      checkLottoDisplay(amount);
      checkToggleButton("inline");
      checkToggleButton("none");

      inputLottoNumbers([2, 18, 24, 30, 32, 45]);
      cy.get(".bonus-number").type(32);
      cy.get(".open-result-modal-button").click();
      cy.get("@windowAlert").should("be.calledWith", MESSAGE.NUM_DUP);
    });
    
  });

  


});
