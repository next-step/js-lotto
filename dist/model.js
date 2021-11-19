import { ErrorMsgs, UNIT_PRICE } from './constants.js';
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
    setPrice(price) {
        if (price < UNIT_PRICE)
            throw Error(ErrorMsgs.MIN_PRICE);
        const amount = Math.floor(price / UNIT_PRICE);
        this.#data.amount = amount;
        return amount;
    }
    setAllLottoRandom(price) {
        const amount = this.setPrice(price);
        const list = arrayGen(amount, buildRandomLotto);
        this.#data.list = list;
        return list;
    }
}
export default new LottoModel();
//# sourceMappingURL=model.js.map