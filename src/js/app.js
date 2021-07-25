import { div, form, section } from "./utils/htmlElementCreator.js"
import Input from "./pages/input.js"
import Component from "./components/Component.js"
import PurchaseList from "./pages/purchaseList.js"
import Result from "./pages/result.js"


export default class App extends Component{
    constructor({component}, subject) {
        super({component})
        this.subject = subject
        this.init()
    }

    init() {
        const $main = this.$component.querySelector(".w-100")
        
        const input = new Input({component : form({id: "input-component", className: "mt-5"}), store: this.subject.store})
        const purchaseList = new PurchaseList({component: section({id: "purchase-list", className: "mt-9"}), store: this.subject.store})
        const result = new Result({component : form({id: "result-component", className: "mt-9"}), store: this.subject.store})


        this.subject.subscribe({observer: input, state: ["purchaseAmount", "step"]})
        this.subject.subscribe({observer: purchaseList, state: ["lottoArr", "checked", "step"]})
        this.subject.subscribe({observer: result, state: ["lastWinningLottoNum", "step"]})


        $main.appendChild(input.$component)
        $main.appendChild(purchaseList.$component)
        $main.appendChild(result.$component)
    }




    
    template() {
        return `
        <h1 class="text-center">🎱 행운의 로또</h1>
        <div class="d-flex justify-center mt-5">
          <div class="w-100">
          </div>
        </div>
        `
    }
}
