const reactiveRenderList = [];

function registeReactiveRender(render) {
  reactiveRenderList.push(render);
}

function reactiveRender() {
  reactiveRenderList.forEach(renderFunction => renderFunction());
}

export { registeReactiveRender, reactiveRender };
