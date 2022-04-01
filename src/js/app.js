const initState = {
  price: 0,
  count: 0,
  lottoList: [],
  isShowLottoList: false,
};

class App {
  constructor() {
    this.state = {};
    this.init();
  }
  init() {
    this.state = { ...initState };
    this._init();
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  setRenderer() {}
}

export default App;
