export function filterComma(number) {
    return String(number).split('').reverse().reduce((prev, current, index) => {
        if (index !== 0 && index % 3 === 0) {
            prev.push(',');
        }
        prev.push(current);

        return prev;
    }, []).reverse().join('');
}
