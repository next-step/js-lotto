export class View {
  $target;

  constructor($target) {
    if (!($target instanceof HTMLElement)) throw new TypeError("$target should be a HTMLElement");
    this.$target = $target;
  }

  render(state) {
    throw new Error("Not implemented");
  }
}
