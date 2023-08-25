import Console from "../util/Console.js";

class LottoListOutputView {
    static render (lottoList) {
        lottoList.lottoList.forEach((lotto) => Console.print(lotto.lottoNumbers));
    }
}