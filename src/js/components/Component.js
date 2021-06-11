function Component() {
  this.state = {};
  this.props = {};
  this.children = {};
  this.render();
}

Component.prototype = {
  setState: function (nextState) {
    this.state = nextState;
    Object.values(this.children).map((component) => {
      component.updateProps({ ...this.state });
    });
    this.render();
  },
  updateProps: function (newProps) {
    let isChanged = false;
    // TODO: 자기자신이 가지고 있는 거라면 그걸 업데이트 한다.
    Object.entries(this.props).map(([key, value]) => {
      if (!newProps.hasOwnProperty(key)) return;
      this.props[key] = newProps[key];
      isChanged = true;
    });
    // TODO: 만약 변한게 있다면 render를 해야한다.
    if (isChanged) this.render();
    // TODO: 자신에 대한 업데이트가 끝나면 현재 컴포넌트가 자식에게 넘겨준
    Object.values(this.children).map((component) => {
      component.updateProps(newProps);
    });
  },
  render: () => {},
};

export default Component;
