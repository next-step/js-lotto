import { getState } from '../store/state.js';
import { subject } from '../index.js';

export default class WinningNumber extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    subject.subscribe(this);
  }

  onStateChange() {
    this.render();
  }

  setEvent() {}

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    const { ticketCount } = getState();
    // const $form = this.$target.querySelector('form[data-cy="winning-number-form"]');
    this.shadow.innerHTML =
      ticketCount > 0
        ? `${style}
    		<form class="mt-9" data-cy="winning-number-form">
            <label class="flex-auto d-inline-block mb-3"
              >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
            >
            <div class="d-flex">
              <div>
                <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                <div>
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                  />
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                  />
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                  />
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                  />
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                  />
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                  />
                </div>
              </div>
              <div class="bonus-number-container flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                  <input type="number" class="bonus-number text-center" />
                </div>
              </div>
            </div>
            <button
              type="button"
              class="open-result-modal-button mt-5 btn btn-cyan w-100"
            >
              결과 확인하기
            </button>
          </form>
    	`
        : '';
  }
}

const style = `
<style>
  form {
    display: block;
  }
  .mt-9 {
    margin-top: 2.25rem;
  }
  .d-inline-block {
    display: inline-block;
  }
  html,
  body {
    margin: 0;
    height: 100%;
    font-size: 16px;
  }
  .d-flex {
    display: flex;
  }
  .mb-3 {
    margin-bottom: 0.75rem;
  }
  .mt-5 {
    margin-top: 1.25rem;
  }
  .w-100 {
    width: 100%;
  }
  .btn-cyan {
    background-color: #00bcd4 !important;
    border-color: #00bcd4 !important;
  }
  .btn {
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
    border-radius: 4px;
    outline: 0;
    border-style: none;
    cursor: pointer;
  }
  .mt-0 {
    margin-top: 0px;
  }
  .font-bold {
    font-weight: 700;
  }
  .text-center {
    text-align: center;
  }
  .winning-number {
    width: 30px;
    height: 36px;
  }
  .mx-1 {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
  .bonus-number {
    width: 30px;
    height: 36px;
  }
  .justify-center {
    justify-content: center;
  }
</style>

`;

customElements.define('winning-number', WinningNumber);

// import Component from '../core/Component.js';

// export default class WinningNumber extends Component {
//   template() {
//     const { ticketCount } = this.state;
//     const $form = this.$target.querySelector('form[data-cy="winning-number-form"]');
//     $form.innerHTML =
//       ticketCount > 0
//         ? `
//     		<form class="mt-9" data-cy="winning-number-form">
//             <label class="flex-auto d-inline-block mb-3"
//               >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
//             >
//             <div class="d-flex">
//               <div>
//                 <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
//                 <div>
//                   <input
//                     type="number"
//                     class="winning-number mx-1 text-center"
//                   />
//                   <input
//                     type="number"
//                     class="winning-number mx-1 text-center"
//                   />
//                   <input
//                     type="number"
//                     class="winning-number mx-1 text-center"
//                   />
//                   <input
//                     type="number"
//                     class="winning-number mx-1 text-center"
//                   />
//                   <input
//                     type="number"
//                     class="winning-number mx-1 text-center"
//                   />
//                   <input
//                     type="number"
//                     class="winning-number mx-1 text-center"
//                   />
//                 </div>
//               </div>
//               <div class="bonus-number-container flex-grow">
//                 <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
//                 <div class="d-flex justify-center">
//                   <input type="number" class="bonus-number text-center" />
//                 </div>
//               </div>
//             </div>
//             <button
//               type="button"
//               class="open-result-modal-button mt-5 btn btn-cyan w-100"
//             >
//               결과 확인하기
//             </button>
//           </form>
//     	`
//         : '';
//   }

//   init() {
//     this.templateHTML = '<form class="mt-9" data-cy="winning-number-form"></form>';
//     this.$target.innerHTML = `${this.$target.innerHTML}${this.templateHTML}`;
//   }

//   render() {
//     this.template();
//   }
// }
