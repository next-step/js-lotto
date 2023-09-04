export default class LottoListContainer {
    #$lottoListContainer;
    #$lottoAmount;
    #$lottoNumbersToggleButton;
    #$lottoList;

    #state = {
        lottoList: [],
        isVisibleLottoNumbers: false
    }
    constructor({$target}) {
        this.#$lottoListContainer = $target;
        this.#$lottoAmount = document.querySelector("#lotto-amount");
        this.#$lottoList = document.querySelector("#lotto-list");
        this.#$lottoNumbersToggleButton = document.querySelector(".lotto-numbers-toggle-button");
        this.#$lottoNumbersToggleButton.addEventListener("change", this.#onChangeToggleButton.bind(this));
        this.init();
    }

    init() {
        this.#state = {
            lottoList: [],
            isVisibleLottoNumbers: false
        }
        this.#$lottoNumbersToggleButton.checked = false;
        this.#$lottoListContainer.style.display = "none";
    }

    get state() {
        return this.#state;
    }

    setState(nextState) {
        this.#state = {
            ...this.#state,
            ...nextState
        };
    }

    #onChangeToggleButton(e) {
        this.setState({isVisibleLottoNumbers: e.target.checked});
        this.render();
    }

    render() {
        this.#renderLottoAmount();
        this.#renderLottoList();
        this.#$lottoListContainer.style.display = "block";
    }

    #renderLottoAmount() {
        this.#$lottoAmount.innerText = `총 ${this.#state.lottoList.length}개를 구매하였습니다.`;
    }

    #renderLottoList() {
        this.#$lottoList.innerHTML = this.#state.lottoList.map(lotto =>
            this.#renderLotto(lotto, this.#state.isVisibleLottoNumbers)
        ).join("");
    }

    #renderLotto(lotto, isVisibleLottoNumbers) {
        if(!isVisibleLottoNumbers)
            return  `<span class="mx-1 text-4xl">🎟️</span>`
        return `<span class="mx-1 text-4xl lotto-wrapper">🎟️<span class="text-xl">${this.#state.isVisibleLottoNumbers && lotto.getSortedLottoNumbers().join(", ")}</span></span>`;
    }
}