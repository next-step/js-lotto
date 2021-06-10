import {
  $,
  $addClass,
  $removeClass,
  $hide,
  $on,
  $show,
} from '../utils/helpers.js';
import Lotto from './Lotto.js';

const initialState = {
  lottos: [],
  isShowNumber: false,
};

function Lottos($root, { state }) {
  this.$root = $root;
  this.$lottoIcons = $('#lotto-icons', $root);
  this.$checkBox = $('input', $root);
  this.state = state;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.mountComponents = () => {
    this.components = this.state.lottos.map(
      (lotto, index) =>
        new Lotto($('#lotto-icons'), {
          state: {
            id: index,
            lotto,
            isShowNumber: this.state.isShowNumber,
          },
        })
    );
  };

  this.render = () => {
    if (!this.state.lottos) return $hide(this.$root);
    $show(this.$root);
    if (this.state.isShowNumber) {
      $addClass(this.$lottoIcons, 'flex-col');
    } else {
      $removeClass(this.$lottoIcons, 'flex-col');
    }
    this.mountComponents();

    // if (!this.state.isComponentsMounted) this.mountComponents();
  };

  this.handleCheckBox = () => {
    // this.setState({ ...this.state, isShowNumber: !this.state.isShowNumber });
  };

  // TODO: checkBox에 대한 이벤트를 등록해야한다.
  $on(this.$checkBox, 'change', this.handleCheckBox);

  // NOTE: Construction
  // this.setState({ ...this.state });
}

export default Lottos;
