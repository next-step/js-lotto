import { $$ } from "./utils.js";
const PRIZE = [5000, 50000, 1500000, 30000000,2000000000]

const getTotalPrize = (resultCount) => {
    let totalPrize = 0;
    PRIZE.map(function(value, index){
        totalPrize += resultCount[index]  * value
    })
    return totalPrize;
}

const getProfit = (totalPrize) => { 
    let inputMoney = 1000 * $$(".lotto-detail").length
    return parseInt(( totalPrize - inputMoney) / inputMoney * 100)
}

const getLottoNumber = () => {
    const NumberSet = [...Array(45).keys()].map(i => i+1);
    const shuffle = (array) => array.sort( () => Math.random() - 0.5 )
    const LottoNumber = shuffle(NumberSet).slice(1,7).sort(function(a, b) {
        return a - b;
    });
    return LottoNumber.join(", ")
}

const getResult = () => {
    let numbers = []
    let winningNumber = []
    let winningResult = []
    let bonus = document.querySelector(".bonus-number").value

    Object.values($$(".lotto-detail")).map(function(v) {
        numbers.push(v.textContent.replaceAll(" ","").split(","))
    })

    Object.values($$(".winning-number")).map(function(v){
        winningNumber.push(v.value)
    })
    
    numbers.map(function(number){
        let counter = 0;
        number.map(function(v){
            winningNumber.includes(v) ? counter += 1 : ""
            bonus === v ? counter += 0.5 : ""
        })
        winningResult.push(counter)
    })
    return winningResult
}

export { getProfit, getLottoNumber, getResult,getTotalPrize }