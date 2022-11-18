import Component from '../core/Component.js';

// target 을 section으로 좀 줄여야 할듯..
export default class PurchaseTickets extends Component {
  constructor($target, state, toggleNumbers) {
    super($target, state);
    this.toggleShowNumbers = toggleNumbers;
  }

  setEvent() {
    const handleToggleShowNumbers = event => {
      if (event.target.type === 'checkbox') {
        this.toggleShowNumbers();
      }
    };
    this.$target.addEventListener('change', handleToggleShowNumbers);
  }

  template() {
    const { ticketCount, isNumberVisible, tickets } = this.state;
    const $section = this.$target.querySelector('section');

    $section.innerHTML =
      ticketCount > 0
        ? `
    		<section class="mt-9">
    		<div class="d-flex">
    			<label class="flex-auto my-0"
    				>총 <span data-cy="total-purchase">${ticketCount}</span>개를
    				구매하였습니다.</label>
    			<div class="flex-auto d-flex justify-end pr-1">
    				<label class="switch">
    					<input type="checkbox" class="lotto-numbers-toggle-button" data-cy="toggle-number-button" ${
                isNumberVisible === true ? 'checked' : ''
              } />
    					<span class="text-base font-normal">번호보기</span>
    				</label>
    			</div>
    		</div>
    		<div class="d-flex flex-wrap">
    		${new Array(ticketCount)
          .fill('')
          .map(
            (element, index) =>
              `<div class='lotto-conatiner'><span class="mx-1 text-4xl" data-cy="ticket-icon">🎟️ </span>
							${
                isNumberVisible === true
                  ? `<span class="lotto-detail" data-cy='lotto-numbers'>${tickets[
                      index
                    ].join(', ')}</span>`
                  : ''
              }</div>`,
          )
          .join('')}
    		</div>
    	</section>
    	`
        : '<section class="mt-9"></section>';
  }

  init() {
    this.templateHTML = '<section class="mt-9"></section>';
    this.$target.innerHTML = `${this.$target.innerHTML}${this.templateHTML}`;
  }

  render() {
    this.template();
  }
}
