import Console from "../../util/Console.js";

class LottoListOutputView {
    static render (lottoList) {
        lottoList.forEach((lotto) => Console.print(lotto.getSortedLottoNumbers()));
    }
}

export default LottoListOutputView;