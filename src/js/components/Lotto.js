import lottoTemplate from '../templates/lottoTemplate.js';

const initialState = {
  isMounted: false,
}

function Lotto($root, props) {
  this.$root = $root;
  this.props = props;
  this.state = initialState;

  this.createElement = () => {
    this.$lotto = document.createElement('li');
    this.$lotto.dataset.id = this.props.id;
    this.$lotto.innerHTML = lottoTemplate(this.props.lotto);
  }

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.mount = () => {
    this.$root.insertAdjacentElement('beforeEnd', this.$lotto);
    this.setState({...this.state, isMounted: true});
  }

  this.render = () => {
    if (!this.state.isMounted) this.mount();
    if (this.props.isShowNumber && this.$lotto) {
      this.$lotto.lastElementChild.style.display = 'inline-block';
    } else {
      this.$lotto.lastElementChild.style.display = 'none';
    }
  }

  this.updateProps = (props) => {
    this.props = props;
    this.render();
  }

  // NOTE: Construction
  this.createElement();
  this.render();
}

export default Lotto;