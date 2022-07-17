export class Model {
  state;

  setState(next) {
    this.state = {
      ...this.state,
      ...next,
    };
  }

  getState() {
    return this.state;
  }
}
