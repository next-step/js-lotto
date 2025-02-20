import Lotto from "../src/domain/Lotto";
import LottoDraw from "../src/domain/LottoDraw.js";
import { ERROR_MESSAGES, lottoPrice } from "../src/utils/constants.js";
import { LOTTO_TICKET_CASES, LOTTO_WINNING_NUMBERS } from "./constants.js";

describe("로또 추첨 테스트", () => {
  it("기본적으로 로또 당첨 숫자와 로또 티켓을 가진다.", () => {
    const lottoNumbers = {
      lottoWinningNumbers: [1, 2, 3, 4, 5, 6],
      lottoBonusNumber: 7,
    };
    const lottoTickets = [new Lotto()];

    const lottoDraw = new LottoDraw(lottoNumbers, lottoTickets);

    expect(lottoDraw.lottoNumbers).toEqual(lottoNumbers);
    expect(lottoDraw.lottoTickets).toEqual(lottoTickets);
  });

  it("로또 당첨 번호가 없으면 에러를 반환한다.", () => {
    const lottoNumbers = {
      lottoWinningNumbers: [],
      lottoBonusNumber: [],
    };

    const lottoTickets = [new Lotto()];

    expect(() => new LottoDraw(lottoNumbers, lottoTickets)).toThrow(
      ERROR_MESSAGES.MUST_BE_SEVEN_DIGITS
    );
  });

  describe("일치한 번호 개수 카운트 함수 테스트", () => {
    const lottoNumbers = LOTTO_WINNING_NUMBERS;
    const lottoTickets = LOTTO_TICKET_CASES.map((num) => new Lotto(num));

    let lottoDraw;
    beforeEach(() => {
      lottoDraw = new LottoDraw(lottoNumbers, lottoTickets);
    });

    it("모든 번호가 일치하면 6을 반환한다.", () => {
      const count = lottoDraw.countMatchedNumbers(lottoTickets[0]);
      expect(count).toBe(6);
    });

    it("5개 번호가 일치하면 5를 반환한다.", () => {
      const count = lottoDraw.countMatchedNumbers(lottoTickets[1]);
      expect(count).toBe(5);
    });

    it("4개 번호가 일치하면 4를 반환한다.", () => {
      const count = lottoDraw.countMatchedNumbers(lottoTickets[3]);
      expect(count).toBe(4);
    });

    it("3개 번호가 일치하면 3을 반환한다.", () => {
      const count = lottoDraw.countMatchedNumbers(lottoTickets[4]);
      expect(count).toBe(3);
    });

    it("2개 번호가 일치하면 2를 반환한다.", () => {
      const count = lottoDraw.countMatchedNumbers(lottoTickets[5]);
      expect(count).toBe(2);
    });

    it("1개 번호가 일치하면 1을 반환한다.", () => {
      const count = lottoDraw.countMatchedNumbers(lottoTickets[6]);
      expect(count).toBe(1);
    });

    it("모든 번호가 일치하지 않으면 0을 반환한다.", () => {
      const count = lottoDraw.countMatchedNumbers(lottoTickets[7]);
      expect(count).toBe(0);
    });
  });

  describe("보너스 번호 체크 함수 테스트", () => {
    const lottoNumbers = LOTTO_WINNING_NUMBERS;

    const lottoTickets = [
      new Lotto([1, 2, 3, 4, 5, 7]), // 보너스 번호 o
      new Lotto([11, 12, 13, 14, 15, 17]), // 보너스 번호 x
    ];

    let lottoDraw;
    beforeEach(() => {
      lottoDraw = new LottoDraw(lottoNumbers, lottoTickets);
    });

    it("보너스 번호가 있으면 true를 반환한다.", () => {
      expect(lottoDraw.checkBonus(lottoTickets[0])).toBeTruthy();
    });

    it("보너스 번호가 없으면 false를 반환한다.", () => {
      expect(lottoDraw.checkBonus(lottoTickets[1])).toBeFalsy();
    });
  });

  describe("숫자 카운트와 보너스 여부 반환 메서드 테스트", () => {
    const lottoNumbers = LOTTO_WINNING_NUMBERS;

    const lottoTickets = [
      new Lotto([1, 2, 3, 4, 5, 6]), // 6개 일치
      new Lotto([1, 8, 9, 10, 11, 12]), // 1개 일치
      new Lotto([7, 8, 9, 10, 11, 12]), // 0개 일치
    ];

    let lottoDraw;
    beforeEach(() => {
      lottoDraw = new LottoDraw(lottoNumbers, lottoTickets);
    });

    it("각 티켓의 일치하는 번호와 보너스 번호 체크 결과를 반환해야 한다.", () => {
      const results = lottoDraw.getMatchedTicketStatus();

      expect(results).toEqual([
        { matchedCount: 6, hasBonus: false },
        { matchedCount: 1, hasBonus: false },
        { matchedCount: 0, hasBonus: true },
      ]);
    });
  });

  describe("당첨 금액 관련 테스트", () => {
    const lottoNumbers = LOTTO_WINNING_NUMBERS;
    const lottoTickets = LOTTO_TICKET_CASES;

    const lottoTicketsStatus = [
      { matchedCount: 6, hasBonus: false },
      { matchedCount: 5, hasBonus: true },
      { matchedCount: 4, hasBonus: false },
      { matchedCount: 3, hasBonus: false },
      { matchedCount: 0, hasBonus: false },
    ];

    describe("당첨 카운트 증가 함수 테스트", () => {
      let lottoDraw;
      beforeEach(() => {
        lottoDraw = new LottoDraw(lottoNumbers, lottoTickets);

        lottoDraw.calculateCount(lottoTicketsStatus);
      });

      it("6개 일치 시 카운트가 1이어야 한다.", () => {
        expect(lottoDraw.result.counts[6]).toBe(1); // 6개 일치
      });

      it("5개 일치 + 보너스 시 카운트가 1이어야 한다.", () => {
        expect(lottoDraw.result.counts["5Bonus"]).toBe(1); // 5개 일치 + 보너스
      });

      it("4개 일치 시 카운트가 1이어야 한다.", () => {
        expect(lottoDraw.result.counts[4]).toBe(1); // 4개 일치
      });

      it("3개 일치 시 카운트가 1이어야 한다.", () => {
        expect(lottoDraw.result.counts[3]).toBe(1); // 3개 일치
      });

      it("0개 일치는 카운트되지 않아야 한다.", () => {
        expect(lottoDraw.result.counts[0]).toBeUndefined(); // 0개 일치는 카운트되지 않음
      });
    });

    describe("당첨 금액 계산 테스트", () => {
      let lottoDraw;
      beforeEach(() => {
        lottoDraw = new LottoDraw(lottoNumbers, lottoTickets);

        lottoDraw.calculateCount(lottoTicketsStatus);
      });

      it("총 당첨 금액을 올바르게 계산해야 한다.", () => {
        const totalPrize = lottoDraw.calculateWinningAmount();

        expect(totalPrize).toBe(2000000000 + 30000000 + 50000 + 5000);
      });
    });

    describe("수익률 계산 테스트", () => {
      let lottoDraw;
      beforeEach(() => {
        lottoDraw = new LottoDraw(lottoNumbers, lottoTickets);

        lottoDraw.calculateCount(lottoTicketsStatus);
      });

      it("수익률을 올바르게 계산해야 한다.", () => {
        lottoDraw.calculateWinningAmount(); // 당첨 금액 계산
        lottoDraw.calculateRateOfReturn(); // 수익률 계산

        const totalPrize = lottoDraw.calculateWinningAmount();
        const ticketsPrice = lottoDraw.lottoTickets.length * lottoPrice;
        const expectedRateOfReturn =
          ((totalPrize - ticketsPrice) / ticketsPrice) * 100;

        expect(lottoDraw.result.rateOfReturn).toBe(expectedRateOfReturn);
      });
    });
  });
});
