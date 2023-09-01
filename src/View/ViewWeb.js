export class ViewWeb {
  constructor() {}

  readPurchaseAmount() {
    return document.querySelector('#purchaseAmountInput').value;
  }

  printPurchasedTickets(tickets) {
    const ticketsContainer = document.querySelector('#ticketsContainer');
    ticketsContainer.innerHTML = '';
    for (const ticket of tickets) {
      const ticketElement = document.createElement('div');
      ticketElement.textContent = ticket;
      ticketsContainer.appendChild(ticketElement);
    }
  }
}
