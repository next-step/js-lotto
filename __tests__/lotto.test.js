import Lotto from "../src/domain/lotto.js";

describe("Lotto Class 테스트", () => {
    it("랜덤한 로또번호를 생성한다.", () => {
        const lotto = new Lotto();
        expect(lotto.lottoNumbers.length).toEqual(6);
    });
});