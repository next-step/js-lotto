import App from "./App.js";
import Store from "./store/index.js";
import { INITIAL_STATE } from "./utils/constants.js";

const initialState = JSON.parse(JSON.stringify(INITIAL_STATE));

new App(new Store(), initialState);
