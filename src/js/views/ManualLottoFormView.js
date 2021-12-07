import { $, $$, hasDuplicateNumber } from "../utils/common.js";
import { ERROR_MESSAGES } from "../constants/index.js";
import View from "./View.js";

class ManualLottoFormView extends View {
  tag = "ManualLottoFormView";
  constructor() {
    super();
    this.$AutoSelectCheckbox = $(".auto-select-rest-checkbox");
    this.$applyButton = $(".btn-apply");
  }

  bindEvent() {
    this.$AutoSelectCheckbox.addEventListener("click", this.toggleAutoAll);
    this
      .on("keyup", this.onKeyUp)
      .on("submit", this.onSubmit);
  }

  toggleAutoAll = (e) => {
    const lottoManualItems = [...$$(".lotto-manual-item", this.$elem)];
    const getLottoManualInputs = $elem => [...$$("input[type='number']", $elem)];

    if (e.target.checked === false) {
      lottoManualItems
        .filter($elem => $elem.dataset.process === "auto")
        .forEach($elem => {
          $elem.dataset.process = "manual";
          getLottoManualInputs($elem).forEach($input => {
            $input.removeAttribute("disabled");
          });
        });
    } else {
      lottoManualItems
        .filter($elem => $elem.dataset.process === "manual" && getLottoManualInputs($elem).every(v => !v.value))
        .forEach($elem => {
          $elem.dataset.process = "auto";
          getLottoManualInputs($elem).forEach($input => {
            $input.setAttribute("disabled", true);
          });
        });
    }
  } 

  onKeyUp = ({ target, key }) => {
    if (target.type === "number" && key >= 0 && key <= 9 && target.value.length == 2) {
      if(target.nextElementSibling) target.nextElementSibling.focus();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const lottoManualItems = [...$$(".lotto-manual-item[data-process='manual']", e.currentTarget)];
    const getLottoManualInputs = $elem => [...$$("input[type='number']", $elem)];

    const totalManualItems = lottoManualItems
      .map(($elem) => getLottoManualInputs($elem).map(v => Number(v.value)));
    
    if (totalManualItems.some(items => new Set(items).size < 6)) {
      window.alert(ERROR_MESSAGES.DUPLICATE_NUMBER);
      return false;
    }

    this.$AutoSelectCheckbox.disabled = true;
    this.$applyButton.disabled = true;

    lottoManualItems.forEach(($elem) => {
      getLottoManualInputs($elem).forEach($input => {
        $input.setAttribute("disabled", true);
      });
    });
    
    this.emit("submit.updateManualLottoTicket", {
      totalManualItems,
    });
  }

  render({ amount }) {
    const list = $("ul", this.$elem);
    if (list) {
      list.parentNode.removeChild(list);
    }
    this.$elem.insertAdjacentHTML("afterbegin", this.getListHTML(amount));

    return this;
  }

  getListHTML(amount) {
    return `<ul class="d-flex flex-wrap">
      ${Array.from(new Array(amount), _ =>
        `<li class="d-flex items-center mx-1 text-4xl lotto-manual-item" data-process="manual">
          <span class="lotto-icon">🎟️</span>
          <div class="lotto-detail">
            <input
              type="number"
              class="manual-lotto-number mx-1 text-center"
              required 
              min="1" 
              max="45"
              data-index="0"
            />
            <input
              type="number"
              class="manual-lotto-number mx-1 text-center"
              required 
              min="1" 
              max="45"
              data-index="1"
            />
            <input
              type="number"
              class="manual-lotto-number mx-1 text-center"
              required 
              min="1" 
              max="45"
              data-index="2"
            />
            <input
              type="number"
              class="manual-lotto-number mx-1 text-center"
              required 
              min="1" 
              max="45"
              data-index="3"
            />
            <input
              type="number"
              class="manual-lotto-number mx-1 text-center"
              required 
              min="1" 
              max="45"
              data-index="4"
            />
            <input
              type="number"
              class="manual-lotto-number mx-1 text-center"
              required 
              min="1" 
              max="45"
              data-index="5"
            />
          </div>
        </li>`
      ).join("")}
    </ul>`;
  }

  initValue() {
    this.$AutoSelectCheckbox.checked = false;
    this.$AutoSelectCheckbox.disabled = false;
    this.$applyButton.disabled = false;

    return this;
  }
}

export default new ManualLottoFormView();
