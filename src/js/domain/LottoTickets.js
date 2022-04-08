export class LottoTickets {
    #tickets;

    constructor(tickets) {
        this.#tickets = tickets;
    }

    get tickets() {
        return this.#tickets;
    }

    get length() {
        return this.value.length;
    }
}
