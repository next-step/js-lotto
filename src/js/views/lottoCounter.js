export default (targetElement, { ticketCount }) => {
    const newCounter = targetElement.cloneNode(true);
    newCounter.textContent = ticketCount;
    return newCounter;
}