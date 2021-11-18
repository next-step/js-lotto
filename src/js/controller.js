export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindOnClickToggleButton(this.onClickToggleButton);
    this.view.bindOnClickPurchaseButton(this.onClickPurchaseButton);
  }

  onClickPurchaseButton = (money) => {
    console.log('cont.onClickPurchaseButton');
    console.log(this.view.$inputMoney.value);

    this.model.setLottos();
  };

  onClickToggleButton = () => {
    console.log('cont.onClickToggleButton');
    this.view.displayLottos();
  };
}

