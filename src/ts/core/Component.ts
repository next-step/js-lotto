export default abstract class Component<P = {}, S = {}> {
  protected $target: HTMLElement;
  protected props?: P;
  protected state?: S;
  private isMounted: boolean;

  constructor($target: HTMLElement, props?: P, state?: S) {
    this.isMounted = false;
    this.$target = $target;
    this.props = props;
    this.state = state;
    this.componentInit();
    this.render();
    this.isMounted = true;
  }

  protected componentInit() {}
  protected componentDidMount() {}
  protected componentDidUpdate() {}
  protected setState(nextState: S) {}
  protected getInnerHTML() {
    return "";
  }
  protected render() {
    this.$target.innerHTML = this.getInnerHTML();
    if (this.isMounted) {
      this.componentDidUpdate();
    } else {
      this.componentDidMount();
    }
  }
}
