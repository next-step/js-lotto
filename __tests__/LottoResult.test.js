import LottoResult from "../src/domain/LottoResult.js";

describe("LottoResult Class 테스트", () => {
    
    it("일치 숫자 개수와 보너스 일치 여부를 입력 받으면 Map에 저장한다.", () => {
        const lottoResult = new LottoResult();
        lottoResult.addResult(1, false);
        lottoResult.addResult(1, false);

        expect(lottoResult.resultMap.get(1)).toEqual(2);
    });
    
});