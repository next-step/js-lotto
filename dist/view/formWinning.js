import el from '../dom.js';
import View from './index.js';
export default class FormWinning extends View {
    $form;
    constructor() {
        super();
        this.$form = el('<form id="formWinning" class="mt-9">');
        this.$form.addEventListener('submit', this.onSubmit);
        el(this, [
            el(this.$form, [
                '<label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>',
                el('<div class="d-flex">', [
                    el('<div>', [
                        '<h4 class="mt-0 mb-3 text-center">당첨 번호</h4>',
                        el('<div>', Array(6).fill('<input type="number" class="winning-number mx-1 text-center" required min="1" max="45">')),
                    ]),
                    `
            <div class="bonus-number-container flex-grow">
              <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
              <div class="d-flex justify-center">
                <input type="number" class="bonus-number text-center" />
              </div>
            </div>
          `,
                ]),
                '<button type="submit" class="open-result-modal-button mt-5 btn btn-cyan w-100">결과 확인하기</button>',
            ]),
        ]);
    }
    getInputs() {
        return Array.from(this.$form.elements).filter(el => el.localName === 'input');
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.emit('submit@formWinning', { winningNumbers: this.getInputs().map(el => el.value) });
    };
    reset() {
        this.getInputs().forEach(el => {
            el.value = '';
        });
    }
    focus() {
        ;
        this.$form.elements[0].focus();
    }
}
//# sourceMappingURL=formWinning.js.map