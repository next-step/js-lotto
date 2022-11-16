import Component from '../core/Component.js';

export default class PurchaseTicket extends Component {
  setState(newState) {
    super.setState(newState);
  }

  setup() {
    this.templateHTML = '<section class="mt-9"></section>';
    this.$target.innerHTML = `${this.$target.innerHTML}${this.templateHTML}`;
  }

  template() {
    const { ticket } = this.state;
    const $section = this.$target.querySelector('section');

    $section.innerHTML =
      ticket > 0
        ? `
    		<section class="mt-9">
    		<div class="d-flex">
    			<label class="flex-auto my-0"
    				>총 <span data-cy="total-purchase">${ticket}</span>개를
    				구매하였습니다.</label
    			>
    			<div class="flex-auto d-flex justify-end pr-1">
    				<label class="switch">
    					<input type="checkbox" class="lotto-numbers-toggle-button" />
    					<span class="text-base font-normal">번호보기</span>
    				</label>
    			</div>
    		</div>
    		<div class="d-flex flex-wrap">
    		${new Array(ticket)
          .fill('')
          .map(
            () =>
              '<span class="mx-1 text-4xl" data-cy="ticket-icon">🎟️ </span>',
          )
          .join('')}
    		</div>
    	</section>
    	`
        : '<section class="mt-9"></section>';
  }

  render() {
    this.template();
  }
}
