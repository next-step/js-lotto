import { sortNumberArray } from '../../../util/index.js';

export const LottoTicket = (lotto) =>
  `
  <div class="lotto-ticket d-flex items-center">
    <div class="mx-2 text-4xl">🎟️ </div>
    <span  data-test-id="lotto-ticket" class="text-base hidden">${sortNumberArray(lotto).join(
      ', ',
    )}</span>
  <div>`;
