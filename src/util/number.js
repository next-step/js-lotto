export function addCommasToNumber(number) {
    const pattern = /(\d)(?=(\d{3})+(?!\d))/g;
    return number.toString().replace(pattern, "$1,");
}