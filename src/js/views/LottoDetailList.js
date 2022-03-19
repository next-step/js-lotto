// import { CLASS } from '../const/className.js';
// import { emit, $ } from '../dom/index.js';

const render = ($el, numbers) => {
  const $clonedList = $el.cloneNode();
  $clonedList.insertAdjacentHTML(
    'afterBegin',
    numbers
      .map(
        (lotto) => `
          <li>
            <span class="mx-1 text-4xl lotto-icon">🎟️ </span>
            <span class="lotto-detail">${lotto}</span>
          </li>`
      )
      .join('')
  );
  $clonedList.classList.remove('flex-column');
  $el.parentNode.replaceChild($clonedList, $el);
};

export default {
  render,
};
