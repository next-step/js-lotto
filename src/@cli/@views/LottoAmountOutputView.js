import Console from "../util/Console.js";

class LottoAmountOutputView {
    static render(lottoAmount){
        Console.print(`${lottoAmount}개를 구매했습니다.`)
    }
}

export default LottoAmountOutputView;