import Lotto from "../src/domain/lotto.js";

describe("Lotto Class 테스트", () => {
    it("생성한 로또번호를 가져온다.", () => {
        const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
        expect(lotto.getLottoNumbers).toEqual([1, 2, 3, 4, 5, 6]);
    });
});