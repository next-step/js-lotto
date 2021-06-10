import lottoTemplate from '../templates/lottoTemplate.js';

const initialState = {
  isMounted: false,
};

function Lotto($root, { state }) {
  this.$root = $root;
  this.state = state;
  console.log(state);

  this.createElement = () => {
    this.$lotto = document.createElement('li');
    this.$lotto.dataset.id = this.state.id;
    this.$lotto.innerHTML = lottoTemplate(this.state.lotto);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.isShowNumber && this.$lotto) {
      this.$lotto.lastElementChild.style.display = 'inline-block';
    } else {
      this.$lotto.lastElementChild.style.display = 'none';
    }
  };

  // NOTE: Construction
  this.createElement();
  this.$root.appendChild(this.$lotto);
  this.render();
}

export default Lotto;
