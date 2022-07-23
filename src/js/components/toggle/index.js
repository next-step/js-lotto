const TOGGLE_ON = 'on';
const TOGGLE_OFF = 'off';

const settingHideClassName = (hideElement, showElement, toggle, onoff) => {
  toggle.value = onoff;
  showElement.classList.remove('hide');
  hideElement.classList.add('hide');
};

const Toggle = ({ target, checkbox }) => {
  checkbox.addEventListener('click', (e) => {
    const { show, hide } = target;
    const checkboxState = e.target.value;

    if (checkboxState === TOGGLE_ON) {
      settingHideClassName(hide, show, e.target, TOGGLE_OFF);
    }

    if (checkboxState === TOGGLE_OFF) {
      settingHideClassName(show, hide, e.target, TOGGLE_ON);
    }
  });
};

export default Toggle;
