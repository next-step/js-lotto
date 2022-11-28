import { LottoComponent } from "./controllers/lotto.component.js";
import { StateModel } from "./models/state.model.js";
import { LottoView } from "./views/lotto.view.js";
import { Validator } from "./controllers/validator.js";

window.onload = () => {
    const container = {
        view: new LottoView(),
        state: new StateModel({}),
        validator: new Validator()
    }
    const lottoComponent = new LottoComponent(container);
}

