import { $ } from './utils/dom.js';
import { getRandomInt } from './utils/random.js';

const PRICE_PER_LOTTO = 1000;

export class Lottos {
    constructor() {
        this.lottos = [];
        this.$lottoSwitch = $('#lotto-switch');
        this.initEventListener();
    }

    setState({ price }) {
        const numOfLotto = price / PRICE_PER_LOTTO;
        this.lottos = Array.from({ length: numOfLotto }, () => Lottos.generateLotto());
        console.log(this.lottos);
    }

    initEventListener() {
        this.$lottoSwitch.addEventListener('change', this.handleToggle.bind(this));
    }

    handleToggle(e) {
        console.log(e);
    }

    static generateLotto() {
        const lottoNumbers = new Set();
        while (lottoNumbers.size < 6) {
            const number = getRandomInt(1, 45);
            lottoNumbers.add(number);
        }
        return [ ...lottoNumbers ];
    }
}