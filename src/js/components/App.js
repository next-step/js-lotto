import { $eventBindedComponent } from '../helper/index.js';
import AppTemplate from './App.template.js';
import { inputAmount, toggleLottoResultModal, lottoRestart } from './App.actions.js';

const App = $eventBindedComponent(() => {
  const $template = AppTemplate();
  const $events = [
    { type: 'submit', callback: inputAmount },
    { type: 'click', callback: toggleLottoResultModal },
    { type: 'click', callback: lottoRestart },
  ];

  return [$template, $events];
});

export default App;
