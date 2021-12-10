import App from "./App.js";
import Store from "./store/index.js";
import { LOTTOS_STATE } from "./utils/constants.js";

new App(new Store(), LOTTOS_STATE);
