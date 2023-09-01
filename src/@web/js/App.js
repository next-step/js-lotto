import MoneyInputForm from "./components/MoneyInputForm";

export default class App {
    #moneyInputForm;

    constructor() {
        this.#moneyInputForm = new MoneyInputForm({ $target: document.querySelector('#money-input-form'), onSubmit: this.#onSubmitMoneyInputForm });
    }

    #onSubmitMoneyInputForm(money) {
        console.log(money)
    }
}