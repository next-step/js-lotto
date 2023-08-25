import Console from "../util/Console.js";

class ProfitRateOutputView {
    static render(profitRate){
        Console.print(`총 수익률은 ${profitRate}%입니다.`);
    }
}

export default ProfitRateOutputView;