export class TicketList {
  #element;
  #ticketHTMLString = `<li class="mx-1 text-4xl lotto-wrapper">
  <span class="lotto-icon">🎟️ </span>
  <span class="lotto-detail" style="display: none;"></span>
</li>`;
  #separator;

  constructor(element, separator) {
    this.#element = element;
    this.#separator = separator;
  }

  #createTicketElement(ticket) {
    const template = document.createElement("template");
    template.innerHTML = this.#ticketHTMLString;
    const ticketElement = template.content.firstElementChild;

    ticketElement.querySelector(".lotto-detail").innerHTML = ticket.join(
      this.#separator
    );

    this.#element.appendChild(ticketElement);
  }

  #removeTicketElement() {
    while (this.#element.hasChildNodes()) {
      this.#element.removeChild(this.#element.firstChild);
    }
  }

  setTickets(tickets) {
    this.#removeTicketElement();
    tickets.forEach((ticket) => this.#createTicketElement(ticket));
  }

  displayNumber() {
    this.#element.classList.add("flex-col");
    this.#element
      .querySelectorAll(".lotto-detail")
      .forEach((detail) => (detail.style.display = "inline"));
  }

  hideNumber() {
    this.#element.classList.remove("flex-col");
    this.#element
      .querySelectorAll(".lotto-detail")
      .forEach((detail) => (detail.style.display = "none"));
  }
}
