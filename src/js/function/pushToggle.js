export const onClickToggle = (event) => {
  const togglechecked = event.target.checked;
  let lottoNumber = document.querySelectorAll('.user-lotto-number');

  lottoNumber.forEach((number) => {
    number.style.display = togglechecked ? 'inline' : 'none';
  });
};
