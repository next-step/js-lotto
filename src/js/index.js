// controller
import App from "./app.js";
import Lotto from "./lotto.js";
import Ui from "./ui.js";

const app = new App({ target: "#app", model: new Lotto(), view: new Ui() });

export default app;
