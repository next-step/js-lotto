export function handleToggleClick() {
  const $lottoIconsEl = document.querySelector('#lotto-icons');
  const $lottoDetailEls = document.querySelectorAll('.lotto-detail');

  $lottoIconsEl.classList.toggle('flex-col');

  $lottoDetailEls.forEach(el => {
    el.style.display = el.style.display === 'none' ? 'inline' : 'none';
  });
}
