class ShowNumbersToggle {
  constructor() {
    this.$showNumbersToggle = document.querySelector("#show-numbers-toggle");
    this.$ticketContainer = document.querySelector("#ticket-container");
  }

  setEvent() {
    this.$showNumbersToggle.addEventListener("change", (event) => {
      this.toggleShowNumbers(event.target.checked);
    });
  }

  toggleShowNumbers(checked) {
    if (checked) this.$ticketContainer.classList.add("flex-col", "d-block");
    else this.$ticketContainer.classList.remove("flex-col", "d-block");
  }
}

export default ShowNumbersToggle;
