export default class LottoTickets {
    #tickets;

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
