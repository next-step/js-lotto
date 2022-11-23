class App {
  #model;
  #view;
  constructor({ target, model, view }) {
    this.$target = document.querySelector(target);
    this.$amountInput = document.querySelector("#purchase-amount-input");
    this.#model = model;
    this.#view = view;
    this.setEvent();
  }

  onSubmit(form) {
    const submitHandlers = {
      "purchase-input-form": (amount) => {
        this.#model.purchaseLotto(amount);
        this.render(this.#model.state);
      },
    };

    return (
      submitHandlers[form] ||
      (() => {
        throw new Error("해당하는 타입에 대한 정의가 존재하지 않습니다.");
      })
    );
  }

  render(state) {
    this.#view.render(state);
  }

  setEvent() {
    this.$target.addEventListener("submit", (e) => {
      e.preventDefault();

      this.onSubmit(e.target.id)(this.$amountInput.value);
    });

    this.$target.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.classList.contains("view-numbers-checkbox"))
        this.#view.onViewNumbers(e.target.checked);
    });
  }
}
export default App;
