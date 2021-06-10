function Component () {
  this.state = {};
  this.render();
}

Component.prototype = {
  setState: function (nextState) {
    this.state = nextState;
    this.render();
  },
  render: () => {},
}

export default Component;