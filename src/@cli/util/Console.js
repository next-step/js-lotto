import { createInterface } from 'node:readline/promises';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const Console = {
    async readLine(question) {
        return await rl.question(question);
    },
    print(...message) {
        console.log(...message);
    },
};

export default Console;