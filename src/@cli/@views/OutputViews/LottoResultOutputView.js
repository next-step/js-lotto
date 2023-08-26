import Console from "../../util/Console.js";
import {addCommasToNumber} from "../../../util/number.js";
import {LOTTO_INFO} from "../../../consts/Lotto.js";

class LottoResultOutputView {
    static render(lottoResultSummary){
        Console.print(`\n당첨 통계`);
        Console.print(`--------------------`);
        lottoResultSummary.forEach((lottoResult) => {
            if(lottoResult.bonus) {
                Console.print(`${lottoResult.match}개 일치, 보너스 볼 일치 (${addCommasToNumber(LOTTO_INFO.PRIZE[lottoResult.rank])}원) - ${lottoResult.count}개`);
            } else {
                Console.print(`${lottoResult.match}개 일치 (${addCommasToNumber(LOTTO_INFO.PRIZE[lottoResult.rank])}원) - ${lottoResult.count}개`);
            }
        });
    }
}

export default LottoResultOutputView;