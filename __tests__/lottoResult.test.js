import LottoResult from "../src/domain/lottoResult";

describe("LottoResult Class 테스트", () => {
    
    it("일치 숫자 개수와 보너스 일치 여부를 입력 받으면 Map에 저장한다.", () => {
        const lottoResult = new LottoResult();
        lottoResult.addResult(6, false);
        lottoResult.addResult(6, false);

        console.log(lottoResult);

        expect(lottoResult.resultMap.get(7)).toEqual(2);
    });
    
});