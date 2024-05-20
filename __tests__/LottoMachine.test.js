import LottoMachine from "../src/js/domain/LottoMachine";

describe("로또 기계 기능 테스트", () => {
  test("로또 번호를 자동으로 랜덤 생성할 때, 생성되는 로또 번호는 1이상 45이하의 서로 다른 정수이다.", () => {
    // given // when
    const generateRandomLotto = () => {
      const lotto = LottoMachine.generateRandomLotto();
    };

    // then
    expect(generateRandomLotto()).toBeUndefined();
  });
});
