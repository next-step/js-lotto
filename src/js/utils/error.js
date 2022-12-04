export class CustomError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
        this.message = message;
    }
}

export class InputRequiredError extends CustomError {
    constructor(message) {
        super(message, 'InputRequiredError');
    }
}

export class InputMinInsufficientError extends CustomError {
    constructor(message) {
        super(message, 'InputMinInsufficientError');
    }
}

export class InputMaxExceededError extends CustomError {
    constructor(message) {
        super(message, 'InputMaxExceededError');
    }
}

export class IncorrectUnitError extends CustomError {
    constructor(message) {
        super(message, 'IncorrectUnitError');
    }
}

export class NotAllowedDuplicatedValueError extends CustomError {
    constructor(message) {
        super(message, 'NotAllowedDuplicatedValueError');
    }
}

export class OutOfNumberRangeError extends CustomError {
    constructor(message) {
        super(message, 'OutOfNumberRangeError');
    }
}

export class NotAllowedToAddInputError extends CustomError {
    constructor(message) {
        super(message, 'NotAllowedToAddInputError');
    }
}

export class NotAllowedToDeleteInputError extends CustomError {
    constructor(message) {
        super(message, 'NotAllowedToDeleteInputError');
    }
}