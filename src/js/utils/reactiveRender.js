const reactiveRenderList = [];

function registeReactiveRender(render) {
  reactiveRenderList.push(render);
}

function registeReactiveRenderList(renderList) {
  renderList.forEach(registeReactiveRender);
}

function reactiveRender() {
  reactiveRenderList.forEach(renderFunction => renderFunction());
}

export { reactiveRenderList, registeReactiveRender, registeReactiveRenderList, reactiveRender };
