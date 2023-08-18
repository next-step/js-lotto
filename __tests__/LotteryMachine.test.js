import createLotteryMachine from "../src/js/domain/LotteryMachine";
import { FixedIssueStrategy } from "../src/js/domain/LotteryMachine/IssueStrategy";
import Lotto from "../src/js/domain/Lotto";

const { issueLotto } = createLotteryMachine();

describe("로또 발행 테스트", () => {
  const lotto = issueLotto(new FixedIssueStrategy([1, 2, 3, 4, 5, 6]));
  const lottoNumbers = lotto.getLottoNumbers();

  it("Lotto 객체를 반환한다.", () => {
    expect(lotto).toBeInstanceOf(Lotto);
  });
});
