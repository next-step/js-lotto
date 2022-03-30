import { $eventBindedComponent } from '../helper/index.js';
import AppTemplate from './App.template.js';
import { inputAmount } from './App.actions.js';

const App = $eventBindedComponent(() => {
  const $template = AppTemplate();
  const $events = [{ type: 'submit', callback: inputAmount }];

  return [$template, $events];
});

export default App;
