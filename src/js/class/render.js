class Render {
  constructor() {}
  render() {
    document.body.children[0].remove();
    this.start();
    this.isNumberOpen = true;
    this.winningNumberArr = [];

    this.myLotteNumberArr = [];
    this.bonusNumber = -Infinity;
    this.beforeNumberArr = [];
    this.beforeBonusNum = -Infinity;

    this.myLotteNumsFromDom = [];
    this.correctNum = 0;
    this.compareBonus = false;
    this.randomValue = 0;
    this.earning = 0;

    for (let val in this.winNumber) {
      this.winNumber[val] = 0;
    }
  }
}

export { Render };
