import {
  $,
  $addClass,
  $removeClass,
  $hide,
  $on,
  $show,
} from '../utils/helpers.js';
import Lotto from './Lotto.js';
import Component from './Component.js';

const initialState = {
  isShowNumber: false,
};

Lottos.prototype = new Component();
Lottos.prototype.constructor = Component;

function Lottos($root, { props }) {
  this.$root = $root;
  this.$lottoIcons = $('#lotto-icons', $root);
  this.$checkBox = $('input', $root);
  this.state = { ...initialState };
  this.props = props;

  const renderLotto = () => {
    this.$lottoIcons.innerHTML = '';
    this.children = this.props.lottos.map(
      (lotto, index) =>
        new Lotto(this.$lottoIcons, {
          props: {
            id: index,
            lotto,
            isShowNumber: this.state.isShowNumber,
          },
        })
    );
  };

  const handleCheckBox = () => {
    const isShowNumber = this.$checkBox.checked ? true : false;
    isShowNumber
      ? $addClass(this.$lottoIcons, 'flex-col')
      : $removeClass(this.$lottoIcons, 'flex-col');
    this.setState({ ...this.state, isShowNumber });
  };

  this.render = () => {
    if (!this.props.lottos.length) {
      $hide(this.$root);
      return;
    }
    $show(this.$root);
    renderLotto();
  };

  // NOTE: Construction
  const init = () => {
    this.setState({
      ...this.state,
      isShowNumber: this.$checkBox.checked ? true : false,
    });
  };
  init();
  $on(this.$checkBox, 'change', handleCheckBox);
}

export default Lottos;
