function Component () {
  this.state = {};
  this.children = {};
  this.render();
}

Component.prototype = {
  setState: function (nextState) {
    this.state = nextState;
    Object.values(this.children).map((component) => {
       component.setState({ ...this.state });
    })
    this.render();
  },
  render: () => {},
}

export default Component;