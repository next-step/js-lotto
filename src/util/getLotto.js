const makeLotto = () => {
	const lottoSet = new Set();
	while (lottoSet.size !== 7) {
		lottoSet.add(Math.floor(Math.random() * 45) + 1);
	}
	return lottoSet;
};

const getLotto = (ticketNumber) => {
	const result = [];
	for (let i = 0; i < ticketNumber; i++) {
		const lotto = makeLotto();
		result.push(lotto);
	}

	return result;
};

export default getLotto;
