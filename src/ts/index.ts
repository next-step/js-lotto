import "../css/index.css";
import { Id } from "./common/constants";
import { $, id2Query } from "./common/dom";
import App from "./components/App";

new App($(id2Query(Id.app)));
