import addEvent from './addEvent.js';
import initialSetting from './view/initialSetting.js';

function init() {
  initialSetting();
  addEvent();
}

window.addEventListener('load', init);
