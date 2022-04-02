export class LottoTickets {
    static #tickets;

    get tickets() {
        return this.tickets;
    }

    set tickets(tickets) {
        this.#tickets = tickets;
    }
}