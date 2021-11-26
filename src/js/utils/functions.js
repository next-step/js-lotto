export const calculatePayment = (money) => {
	if (money < 1000) return alert("1,000원 이상 입력해주세요");
	const countLotto = Math.floor(money / 1000);
	const charge = money % 1000;
	if (charge !== 0) alert(`거스름돈은 ${charge}원 입니다.`);

	return countLotto;
};

const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomNumbers = () => {
	let numbers = new Set();
	while (numbers.size() < 6) {
		numbers.add(rand(1, 45));
	}

	return [...numbers.sort]((a, b) => a - b).join(', ');
};
