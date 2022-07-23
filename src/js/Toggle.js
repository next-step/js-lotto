const TOGGLE_ON = 'on';
const TOGGLE_OFF = 'off';

const Toggle = ({ target, checkbox }) => {
  checkbox.addEventListener('click', (e) => {
    const checkboxState = e.target.value;
    const hideListElement = target.querySelector('.lotto-number-hide');
    const showListElement = target.querySelector('.lotto-number-show');

    if (checkboxState === TOGGLE_ON) {
      e.target.value = TOGGLE_OFF;
      showListElement.classList.remove('hide');
      hideListElement.classList.add('hide');
    }

    if (checkboxState === TOGGLE_OFF) {
      e.target.value = TOGGLE_ON;
      showListElement.classList.add('hide');
      hideListElement.classList.remove('hide');
    }
  });
};

export default Toggle;
