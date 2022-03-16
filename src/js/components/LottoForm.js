const LOTTO_FORM = 'lotto-form';

export default class LottoForm {
  #el;
  #state;

  constructor(props = { state: { isShow: false } }) {
    const { state } = props;
    this.#state = state;

    this.#el = document.createElement('div');
    this.#el.innerHTML = this.getHtml();

    const $showResultButton = this.#el.querySelector(
      '.open-result-modal-button'
    );

    const onModalShow = () => {
      this.#el.classList.add('open');
    };

    $showResultButton.addEventListener('click', onModalShow);
  }

  get isHidden() {
    return !this.#state.isShow;
  }

  getHtml() {
    return `<form class="mt-9 ${LOTTO_FORM}" ${this.isHidden && 'hidden'}>
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
          </form>`;
  }
}
