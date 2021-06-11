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

  const mountComponents = () => {
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
    this.state.isShowNumber = !this.state.isShowNumber;
    this.state.isShowNumber
      ? $addClass(this.$lottoIcons, 'flex-col')
      : $removeClass(this.$lottoIcons, 'flex-col');
    this.children.map((component) =>
      component.setState({
        ...component,
        isShowNumber: this.state.isShowNumber,
      })
    );
  };

  this.render = () => {
    this.state.isShowNumber = this.$checkBox.checked ? true : false;
    if (!this.props.lottos.length) {
      $hide(this.$root);
      return;
    }
    $show(this.$root);
    mountComponents();
  };

  // NOTE: Construction
  $on(this.$checkBox, 'change', handleCheckBox);
}

export default Lottos;
