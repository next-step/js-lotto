import { setVisibleAreas } from './Element.js';
import { setListeners } from './listener.js';
import { $resultAreas } from './Selector.js';

let lottos = [];

export function initialize() {
  setVisibleAreas($resultAreas, false);
  setListeners(lottos);
}
