export class InputRequiredError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InputRequiredError';
        this.message = message;
    }
}

export class InputMinInsufficientError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InputMinInsufficientError';
        this.message = message;
    }
}

export class InputMaxExceededError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InputMaxExceededError';
        this.message = message;
    }
}

export class IncorrectUnitError extends Error {
    constructor(message) {
        super(message);
        this.name = 'IncorrectUnit';
        this.message = message;
    }
}