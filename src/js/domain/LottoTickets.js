export default class LottoTickets {
    #tickets;

    constructor() {
    }

    get tickets() {
        return this.#tickets;
    }

    set tickets(tickets) {
        this.#tickets = tickets;
    }

    get length() {
        return this.value.length;
    }
}
