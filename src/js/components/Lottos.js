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
  lottos: [],
  isShowNumber: false,
};

Lottos.prototype = new Component();
Lottos.prototype.constructor = Component;

function Lottos($root, { state }) {
  this.$root = $root;
  this.$lottoIcons = $('#lotto-icons', $root);
  this.$checkBox = $('input', $root);
  this.state = state;

  const mountComponents = () => {
    this.$lottoIcons.innerHTML = '';
    // NOTE: 지금 이거 배열인데 나중에 통일성위해 컴포넌트로 바꿔야할듯?
    this.children = this.state.lottos.map(
      (lotto, index) =>
        new Lotto(this.$lottoIcons, {
          state: {
            id: index,
            lotto,
            isShowNumber: this.state.isShowNumber,
          },
        })
    );
  };
  
  const handleCheckBox = () => {
    this.state.isShowNumber = !this.state.isShowNumber;
    this.state.isShowNumber ? $addClass(this.$lottoIcons, 'flex-col') : $removeClass(this.$lottoIcons, 'flex-col');
    this.children.map((component) => component.setState({...component, isShowNumber: this.state.isShowNumber }))
  };

  this.render = () => {
    this.state.isShowNumber = this.$checkBox.checked ? true : false;
    if (!this.state.lottos.length) {
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
