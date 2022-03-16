import PurchaseForm from './components/PurchaseForm.js';

class LottoApp {
  constructor($app) {
    this.$app = $app;
    this.$purchaseForm = new PurchaseForm();
    this.render();
  }

  render() {
    this.$app.innerHTML = `
			<div class="d-flex justify-center mt-5">
				<div class="w-100">
					<h1 class="text-center">🎱 행운의 로또</h1>
					${this.$purchaseForm.render()}
				</div>
			</div>
		`;
  }
}

export default LottoApp;
