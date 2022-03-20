export const createLotto = (count) => {
    let n = 0;
    let LottoContainer = [];    
    while(n < count){
        const lottoArray = Array(45).fill().map((context, index) => {
            return index + 1;
        })

        let shuffleLotto = [];
    
        while(lottoArray.length > 0){
            let moveNum = lottoArray.splice(Math.floor(Math.random() * lottoArray.length), 1)[0];
            shuffleLotto.push(moveNum);
        }
    
        let lottoTicket = shuffleLotto.slice(0,6).sort((p, c) => {
            return p-c;
        });
        LottoContainer.push(lottoTicket);
        n++;
    }
    return LottoContainer;
}