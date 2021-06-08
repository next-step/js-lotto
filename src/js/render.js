import { $, $$ } from "./utils.js"
import { getLottoNumber, getProfit, getTotalPrize } from "./generator.js"
import { ShowResultEvent, ToggleEvent, resetEvent } from "./event.js"

const getLottoWrapper = () => {
    return `
    <li id="lotto-icons" class="d-flex flex-warp">
        <span class="mx-1 text-4xl">🎟️ </span>
        <span class="lotto-detail" hidden>${ getLottoNumber() }</span>
    </li>
    `
}

const renderNumbers = (count) => {
    let DomResult = ``
    for(let i = 0; i < count; i++){
        DomResult += getLottoWrapper()
    }
    $(".numbers").innerHTML = `
        <div class="d-flex">
            <label class="flex-auto my-0">총 ${count}개를 구매하였습니다.</label>
            <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
                <input type="checkbox" class="lotto-numbers-toggle-button" />
                <span class="text-base font-normal">번호보기</span>
            </label>
            </div>
        </div>
        <ul id="lotto-icons" class="d-flex flex-wrap">
            ${DomResult}
        </ul>
    `
    ToggleEvent()
}

const renderResult = () => {
    $(".result").innerHTML = `
        <label class="flex-auto d-inline-block mb-3">
            지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.
        </label>
        <div class="d-flex">
            <div>
                <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                <div>
                    <input
                        type="number"
                        class="winning-number mx-1 text-center"
                    />
                    <input
                        type="number"
                        class="winning-number mx-1 text-center"
                    />
                    <input
                        type="number"
                        class="winning-number mx-1 text-center"
                    />
                    <input
                        type="number"
                        class="winning-number mx-1 text-center"
                    />
                    <input
                        type="number"
                        class="winning-number mx-1 text-center"
                    />
                    <input
                    type="number"
                    class="winning-number mx-1 text-center"
                    />
                </div>
            </div>
            <div class="bonus-number-container flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                    <input type="number" class="bonus-number text-center" />
                </div>
            </div>
        </div>
        <button
            type="button"
            class="open-result-modal-button mt-5 btn btn-cyan w-100"
        >
            결과 확인하기
        </button>
    `
    ShowResultEvent()
}

const renderModal = (winningResult) => {
    const ResultSet = [3,4,5,5.5,6]
    const ResultCount = []
    ResultSet.map(function(value) {
        ResultCount.push(winningResult.filter( x => x=== value).length)
    })
    $("#result3").textContent = ResultCount[0] + "개"
    $("#result4").textContent = ResultCount[1] + "개"
    $("#result5").textContent = ResultCount[2] + "개"
    $("#result5b").textContent = ResultCount[3] + "개"
    $("#result6").textContent = ResultCount[4] + "개"
    
    let profit = getProfit(getTotalPrize(ResultCount))
    $("#profit").textContent = `당신의 총 수익률은 ${profit}%입니다.`
    resetEvent();
}

export { renderNumbers, renderResult, renderModal }