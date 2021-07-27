function Component() {
  this.state = {};
  this.props = {};
  this.children = [];
}

Component.prototype = {
  setState: function (nextState) {
    this.state = nextState;
    this.children.forEach((child) => {
      child.updateProps({ ...this.state });
    });
    this.render();
  },
  updateProps: function (newProps) {
    let isChanged = false;
    // TODO: 자식이 갖고 있는 prop라면 업데이트함
    Object.entries(this.props).map(([key, value]) => {
      if (!newProps.hasOwnProperty(key)) return;
      // TODO: 변하지 않는다면 render하지 않는다. JSON.stringify를 이용해서 체크
      if (JSON.stringify(this.props[key]) === JSON.stringify(newProps[key]))
        return;
      this.props[key] = newProps[key];
      isChanged = true;
    });
    // TODO: 만약 변한게 있다면 render를 해야한다.
    if (isChanged) this.render();
    // TODO: 자신에 대한 업데이트가 끝나면 현재 컴포넌트가 자식에게 넘겨준
    this.children.forEach((child) => {
      child.updateProps(newProps);
    });
  },
  render: () => {},
};

export default Component;
