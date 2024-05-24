import { ERROR_MESSAGE_ACGUMENTS_LENGTH, ERROR_MESSAGE_INPUT_NUMBER, ERROR_MESSAGE_QUERY_TYPE } from '../constants';

export function validateArguments(arg) {
    if (arg.length !== 1) {
        new Error(ERROR_MESSAGE_ACGUMENTS_LENGTH);
    }
}

export function validateQuery(query, type) {
    if (typeof query !== type) {
        new Error(ERROR_MESSAGE_QUERY_TYPE);
    }
}

export function validateOrder(order) {
    if (order !== 'ASC' && order !== 'DESC') {
        throw new Error(`Order 값은 반드시  'ASC' 또는 'DESC'이여야 합니다.`);
    }
}

export function validInputNumber(number) {
    if (Number.isNaN(Number(number))) {
        throw new Error(ERROR_MESSAGE_INPUT_NUMBER);
    }
}

export function validSelectorNotFind(type, element) {
    throw new Error(`${type}가 ${element} 인 요소를 찾을 수 없습니다.`);
}
