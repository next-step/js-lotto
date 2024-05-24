import { Lotto, LottoMachine } from "../src/js/domain/index.js";
import { LOTTO_LENGTH, MAXIMUM_LOTTO_NUMBER, MINIMUM_LOTTO_NUMBER } from "../src/js/constants";
import { TEST_LOTTO_NUMBERS } from "./constants/index.js";

let machine;
let lotto;
beforeEach(() => {
  machine = new LottoMachine();
  lotto = new Lotto(TEST_LOTTO_NUMBERS);
});

describe("로또 정보 테스트", () => {
  test("하나의 로또는 6개의 정수를 갖는다.", () => {
    // when
    const lottoLength = lotto.numbers.length;

    // then
    expect(lottoLength).toBe(LOTTO_LENGTH);
  });

  test("로또의 숫자는 1부터 45까지의 정수이다.", () => {
    // when
    const numbers = lotto.numbers;

    // then
    expect(
      numbers.every((number) => MINIMUM_LOTTO_NUMBER <= number && number <= MAXIMUM_LOTTO_NUMBER)
    ).toBe(true);
  });

  test("로또는 오름차순으로 정렬된 숫자를 갖고 있다.", () => {
    //given
    const isSorted = (arr) => arr.every((v, i) => !i || arr[i - 1] <= v);

    //when
    const numbers = lotto.numbers;
    console.log(numbers);
    const numbersSorted = isSorted(numbers);

    //then
    expect(numbersSorted).toBe(true);
  });

  test("로또는 오름차순으로 정렬된 숫자를 갖고 있다.", () => {
    //given
    const isSorted = (arr) => arr.every((v, i) => !i || arr[i - 1] <= v);

    //when
    const numbers = lotto.numbers;
    console.log(numbers);
    const numbersSorted = isSorted(numbers);

    //then
    expect(numbersSorted).toBe(true);
  });
});
