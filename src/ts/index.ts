import "../css/index.css";
import { Id } from "./common/constants";
import { $, id2Query } from "./common/dom";
import App from "./components/App";

const $app = $(id2Query(Id.app)) as HTMLElement;
new App($app);
