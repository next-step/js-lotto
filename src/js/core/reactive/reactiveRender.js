const reactiveRenderList = [];

export function registeReactiveRender(render) {
  reactiveRenderList.push(render);
}

export function reactiveRender() {
  reactiveRenderList.forEach(renderFunction => renderFunction());
}
