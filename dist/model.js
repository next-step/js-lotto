import { ErrorMsgs, UNIT_PRICE, GRADES } from './constants.js';
const arrayGen = (size, mapper) => [...Array(size)].map(mapper);
const numbers = arrayGen(45, (_, i) => i + 1);
const buildRandomLotto = () => {
    const cloneNumbers = [...numbers];
    return arrayGen(6, () => cloneNumbers.splice(Math.floor(Math.random() * cloneNumbers.length), 1)[0]);
};
class LottoModel {
    #data = {
        amount: 0,
        list: [],
    };
    #isLottoValid(item, validLength) {
        if (item.length !== validLength || [...new Set(item)].length !== item.length)
            throw Error(ErrorMsgs.DUPLICATED);
        if (item.some(n => n < 1 || n > 45))
            throw Error(ErrorMsgs.OUT_OF_RANGE);
        return true;
    }
    setPrice(price) {
        if (price < UNIT_PRICE)
            throw Error(ErrorMsgs.MIN_PRICE);
        const amount = Math.floor(price / UNIT_PRICE);
        this.#data.amount = amount;
        return amount;
    }
    setLottoItem(index, item) {
        if (!this.#isLottoValid(item, 6))
            return;
        this.#data.list[index] = item;
        return item;
    }
    setLottoItemRandom(index) {
        const item = buildRandomLotto();
        if (!this.#isLottoValid(item, 6))
            return;
        this.#data.list[index] = item;
        return item;
    }
    setAllLottoRandom(price) {
        const amount = this.setPrice(price);
        const list = arrayGen(amount, buildRandomLotto);
        this.#data.list = list;
        return list;
    }
    getWinList(numbers) {
        const amount = this.#data.list.length;
        const winningNumbers = [...numbers];
        if (!this.#isLottoValid(winningNumbers, 7))
            return false;
        const bonusNumber = winningNumbers.pop();
        const res = this.#data.list.reduce((p, c) => {
            const matched = winningNumbers.filter(num => c.includes(+num)) || [];
            const bonusMatched = matched.length === 5 && c.includes(+bonusNumber);
            switch (matched.length) {
                case 3:
                    p.g5 += 1;
                    break;
                case 4:
                    p.g4 += 1;
                    break;
                case 5: {
                    if (!bonusMatched)
                        p.g3 += 1;
                    else
                        p.g2 += 1;
                    break;
                }
                case 6:
                    p.g1 += 1;
            }
            return p;
        }, {
            g5: 0,
            g4: 0,
            g3: 0,
            g2: 0,
            g1: 0,
        });
        return {
            winningList: res,
            earningRate: (100 *
                (Object.entries(GRADES).reduce((p, [g, { winPrice }]) => {
                    console.log({ winPrice, winning: res[g], res: winPrice * res[g] });
                    return p + winPrice * res[g];
                }, 0) -
                    amount * UNIT_PRICE)) /
                (amount * UNIT_PRICE),
        };
    }
}
export default new LottoModel();
//# sourceMappingURL=model.js.map