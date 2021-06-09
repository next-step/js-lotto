import { $on, $$ } from "../utils/helpers.js";

const initialState = {}

// function WinningNumberForm($root, { isLottosExist }) {
function WinningNumberForm($root, props, onSubmit) {
  this.$form = $root;
  this.$inputs = $$('input', $root);
  this.props = props;
  this.onSubmit = onSubmit;

  this.setState = (nextState) => {
    this.state = nextState;
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

  this.render = () => {
    if (!this.props.isLottosExist) {
      return this.$form.classList.add('hidden');
    } 
    this.$form.classList.remove('hidden');
  }

  this.handleSubmit = (e) => {
    e.preventDefault();
    const nums = [...this.$inputs].map((input) => parseInt(input.value));
    this.onSubmit(nums);
  }

  // NOTE: Construction
  $on(this.$form, 'submit', this.handleSubmit);
  this.setState(initialState);
}

export default WinningNumberForm;