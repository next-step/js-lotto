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

  // CHECK 단위 테스트의 범위는 어디까지인가?
  // 이미 Lotto 클래스 단위테스트에서 하단 로직들은 모두 체크하고 있으므로, 중복 체크 아닌가?
  // 불필요한 테스트로 보임. 제외해도 커버리지 100%.
  // it("배열 길이가 6이다.", () => {
  //   expect(lottoNumbers.length).toBe(6);
  // });

  // it("모두 숫자로 이뤄져있다.", () => {
  //   lottoNumbers.forEach((num) => expect(typeof num === "number").toBe(true));
  // });

  // it("숫자는 [1, 45] 사이의 범위에 존재한다.", () => {
  //   lottoNumbers.forEach((num) => expect(num >= 1 && num <= 45).toBe(true));
  // });

  // it("숫자는 중복이 없다.", () => {
  //   expect(new Set(lottoNumbers).size).toBe(6);
  // });
});
