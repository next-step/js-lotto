import LottoForm from "./Components/LottoForm.js";
import LottoNumForm from "./Components/LottoNumForm.js";
import LottoWinForm from "./Components/LottoWinForm.js";
import { store } from "./modules/store.js";
import { $ } from "./utils/dom.js";

class App {
  constructor() {
    const $Form = $("#lotto-form");
    const $NumForm = $("#lotto-num-form");
    const $WinForm = $("#lotto-win-form");

    store.subscribe(() => {
      new LottoForm($Form);
      new LottoNumForm($NumForm);
      new LottoWinForm($WinForm);
    });

    this.initStore();
  }

  initStore() {
    store.dispatch("");
  }
}

new App();
