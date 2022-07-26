export default function InputValidate() {
  const $inputs = document.querySelectorAll('input');

  $inputs.forEach($input => {
    $input.addEventListener('input', event => {
      event.target.reportValidity();
    });
  });
}
