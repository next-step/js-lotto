export class LottoTickets {
    #tickets;

    constructor(tickets) {
        this.#tickets = tickets;
    }

    get value() {
        return this.#tickets;
    }

    get length() {
        return this.value.length;
    }

    set tickets(tickets) {
        this.#tickets = tickets;
    }
}
