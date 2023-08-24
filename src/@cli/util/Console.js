import readline from "readline";

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export const Console = {
    /** 입력 받기*/
    readLine(question, callback) {
        rl.question(question, (input) => {
            callback(input);
        });
    },
    /** 출력하기*/
    print(...message) {
        console.log(...message);
    },
};
