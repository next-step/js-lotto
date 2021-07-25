export const createLottoNumber = repeatNum => 
Array.from({length:repeatNum}, (v,i) => i )
.map(() => {
    const lottoNumArr = []
    while(lottoNumArr.length < 6) {
        const randomNum = Math.floor(Math.random()*100) + 1
            if(randomNum < 46 && lottoNumArr.indexOf(randomNum) === -1 ) {
                lottoNumArr.push(randomNum)
            }
    }
    return lottoNumArr
})

export const checkLottoNumber = ({lottoArr, lastWinningLottoNum}) => {
    const resultArr = {
        bonus : 0,
        ...Array.from({length:7}, ()=>0)

    }
    
    lottoArr.forEach(lotto => {
        let cnt = 0
        lotto.forEach(num => {
            lastWinningLottoNum.forEach((lastNum, idx) => {
                if(num === +lastNum){
                    if(idx === 6 && cnt == 5) {
                        cnt = 'bonus'
                    } else {
                        cnt++
                    }
                }
            })
        })
        if(cnt > 0) {
            resultArr[cnt]++
        } else if(cnt === 'bonus') {
            resultArr['bonus']++
        }
    })
    return {
        resultArr,
        amount : calcAmount(resultArr)
    }
}

function calcAmount(resultArr) {
    let amount = 0
    amount += resultArr[3] * 5000
    amount += resultArr[4] * 50000
    amount += resultArr[5] * 1500000
    amount += resultArr['bonus'] * 30000000
    amount += resultArr[6] * 2000000000
    return amount
}