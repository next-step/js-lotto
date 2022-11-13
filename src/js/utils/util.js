export const arr = (num) => Array(num).fill(0);
export const getRandom = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

export const getLottoNumbers = () => {
    let numbers = [];
    while (numbers.length < 6) {
        numbers.push(getRandom(1, 45));
        numbers = [...new Set(numbers)];
    }
    return numbers;
}

export const displayBlock = ($element) => $element.style.display = 'block';
export const displayInline = ($element) => $element.style.display = 'inline';
export const displayNone = ($element) => $element.style.display = 'none';