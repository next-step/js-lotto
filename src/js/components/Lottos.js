import { $, $on } from '../utils/helpers.js';
import Lotto from './Lotto.js'

const initialState = {
  isShowNumber: false,
  isComponentsMounted: false,
};

// function Lottos($root, { lottos, isLottosExist }) {
function Lottos($root, props) {
  this.$root = $root;
  this.$lottoIcons = $('#lotto-icons', $root);
  this.$checkBox = $('input', $root);
  this.state = initialState;
  this.props = props;
  this.components = {};

  this.setState = (nextState) => {
    this.state = nextState;
    Object.values(this.components).map(component => {
      component.updateProps && component.updateProps(this.state);
    })
    this.render();
  }

  this.updateProps = (props) => {
    const keys = Object.keys(this.props);
    keys && keys.map((key) => {
      if (!props[key]) return;
      this.props[key] = props[key];
    })
    this.render();
  }

  this.mountComponents = () => {
    this.components = this.props.lottos.map((lotto, index) =>
      new Lotto($('#lotto-icons'), { id: index, lotto , isShowNumber: this.state.isShowNumber }));
    this.setState({...this.state, isComponentsMounted: true });
  }

  this.render = () => {
    if (!this.props.isLottosExist) {
      return this.$root.classList.add('hidden');
    }
    this.$root.classList.remove('hidden');
    if (this.state.isShowNumber) {
      this.$lottoIcons.classList.add('flex-col');
    } else {
      this.$lottoIcons.classList.remove('flex-col');
    }
    if (!this.state.isComponentsMounted) this.mountComponents();
  }

  this.handleCheckBox = () => {
    this.setState({...this.state, isShowNumber: !this.state.isShowNumber });
  }

  // TODO: checkBox에 대한 이벤트를 등록해야한다.
  $on(this.$checkBox, 'change', this.handleCheckBox);

  // NOTE: Construction
  this.setState({ ...this.state})
}

export default Lottos;