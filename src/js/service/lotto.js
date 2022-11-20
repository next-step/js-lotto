import { createRandomNumbers } from "../utils/operate.js";

export let lottos = [];

export const issueLottos = (number) => {
	lottos = Array.from(Array(number), () => createRandomNumbers());
};

export const clearLottos = () => {
	lottos = [];
};
