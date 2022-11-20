// controller
class App {
  #model;
  #view;
  constructor({ target, model, view }) {
    this.$target = document.querySelector(target);
    this.#model = model;
    this.#view = view;
    this.setEvent();
  }

  setEvent() {
    this.$target.addEventListener("submit", (e) => {
      console.log("e.target.value", e.target);
    });

    this.$target.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.classList.contains("lotto-numbers-toggle-button"))
        this.#view.onToggleReadMore(e.target.checked);
    });
  }
}
export default App;
