export default class PubSub {
	constructor() {
		this.listeners = {};
	}
	subscribe(eventType, callback) {
		if (!this.listeners.hasOwnProperty(eventType)) {
			this.listeners[eventType] = [callback];
			return this;
		}
		this.listeners[eventType].push(callback);
		return this;
	}

	publish(eventType, args) {
		if (!this.listeners.hasOwnProperty(eventType)) {
			console.warn(`${eventType}에 해당하는 콜백함수가 존재하지 않습니다.`);
			return this;
		}

		this.listeners[eventType].forEach((callback) => {
			callback(args);
		});
		return this;
	}
}
