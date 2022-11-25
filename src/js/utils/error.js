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
        this.name = 'IncorrectUnitError';
        this.message = message;
    }
}

export class NotAllowedDuplicatedValueError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotAllowedDuplicatedValueError';
        this.message = message;
    }
}

export class OutOfNumberRangeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'OutOfNumberRangeError';
        this.message = message;
    }
}