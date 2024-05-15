import { LOTTO_LENGTH, MAXIMUM_LOTTO_NUMBER, MINIMUM_LOTTO_NUMBER } from "../src/js/constants";
import LottoMachine from "../src/js/domain/LottoMachine";

let machine;
let lotto;
beforeEach(() => {
  machine = new LottoMachine();
  lotto = machine.generateLotto();
});

describe("로또 정보 테스트", () => {
  test("하나의 로또는 6개의 정수를 갖는다.", () => {
    // when
    const lottoLength = lotto.getNumbers().length;

    // then
    expect(lottoLength).toBe(LOTTO_LENGTH);
  });

  test("로또의 숫자는 1부터 45까지의 정수이다.", () => {
    // when
    const numbers = lotto.getNumbers();

    // given
    expect(
      numbers.every((number) => MINIMUM_LOTTO_NUMBER <= number && number <= MAXIMUM_LOTTO_NUMBER)
    ).toBe(true);
  });
});
