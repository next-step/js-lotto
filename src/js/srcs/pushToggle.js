export const onClickToggle = (event) => {
    const togglechecked = event.target.checked;
    let lottoNumber = document.querySelectorAll('.user-lotto-number');

    lottoNumber.forEach(number => {
        if(togglechecked){
            number.style.display = 'inline';
        } else {
            number.style.display = 'none';
        }
    })
    
}