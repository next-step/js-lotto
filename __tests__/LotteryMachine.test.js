import LotteryMachine from "../src/js/LotteryMachine";
import Lotto from "../src/js/Lotto";

describe("로또 발행 테스트", () => {
  let lotto;
  let lottoNumbers;
  beforeEach(() => {
    lotto = LotteryMachine.issueLotto();
    lottoNumbers = lotto.getLottoNumbers();
  });
  it("6개의 숫자를 뽑는다.", () => {
    expect(lottoNumbers.length).toBe(6);
  });

  it("로또 6개 숫자는 [1, 45] 사이의 범위에 존재한다.", () => {
    lottoNumbers.forEach((num) => expect(num >= 1 && num <= 45).toBe(true));
  });

  it("로또 6개 숫자는 중복이 없다.", () => {
    expect(new Set(lottoNumbers).size).toBe(6);
  });

  it("반환된 로또는 Lotto 객체 형태이다.", () => {
    expect(lotto).toBeInstanceOf(Lotto);
  });

  it("로또는 모두 숫자로 이뤄져있다.", () => {
    lottoNumbers.forEach((num) => expect(typeof num).toBe("number"));
  });
});
