import { $eventBindedComponent } from '../helper/index.js';
import AppTemplate from './App.template.js';
import { handleSubmitAmount } from './App.actions.js';

const App = $eventBindedComponent(() => {
  const $template = AppTemplate();
  const $events = [{ type: 'submit', callback: handleSubmitAmount }];

  return [$template, $events];
});

export default App;
