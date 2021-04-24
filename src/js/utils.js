export const getEl = (selector, parent = document) => parent.querySelector(selector);

export const generateLottoNumber = () => {
    const MAX_SIZE = 6;
    const numbers = new Set();

    while (numbers.size < MAX_SIZE) {
        const number = Math.floor(Math.random() * 45) + 1;
        numbers.add(number);
    }

    return [...numbers];
};
