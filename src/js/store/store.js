import createStore from './createStore.js';
import reducer from './reducer.js';

const store = createStore(reducer);

export { store };
