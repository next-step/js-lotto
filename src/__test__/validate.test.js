import { ERRORS } from '../domain/constants/index.js';
import {
  validateBonusDuplicate,
  validateBonusNumer,
  validateNumber,
  validateNumberDuplicate,
  validateNumberRange,
  validatePositiveNumber,
  validatePrice,
  validateWinningNumberCount,
} from '../domain/validator.js';

describe(`Validating Lotto purchase test`, () => {
  it('should be a Number', () => {
    //given
    const MONEY = 'heelo';

    //then
    expect(() => validateNumber(MONEY)).toThrowError(ERRORS.NOT_NUMBER);
  });
  it('should be a greater than price of lotto', () => {
    //given
    const MONEY = 900;

    //then
    expect(() => validatePrice(MONEY)).toThrowError(ERRORS.NOT_ENOUGH_MONEY);
  });
  it('should be a positive number', () => {
    //given
    const MONEY = 2000.2;

    //then
    expect(() => validatePositiveNumber(MONEY)).toThrowError(ERRORS.NOT_POSITIVE_NUMBER);
  });
});

describe(`winning number test`, () => {
  it('should be a 6 numbers', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5];

    //then
    expect(() => validateWinningNumberCount(WINNING_NUMBER)).toThrowError(
      ERRORS.NOT_WINNING_NUMBER_QTY,
    );
  });

  it('winning numbers should be 1 ~ 45', () => {
    //given
    const WINNING_NUMBER = '50';

    //then

    // @ts-ignore
    expect(() => validateNumberRange(WINNING_NUMBER)).toThrowError(ERRORS.NOT_IN_RANGE);
  });

  it('winning numbers should be unique', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5, 5];

    //then
    expect(() => validateNumberDuplicate(WINNING_NUMBER)).toThrowError(ERRORS.NOT_NUMBER_UNIQUE);
  });
});

describe(`bonus number test`, () => {
  it('should be a 1 number', () => {
    //given
    const BONUS_NUMBER = 'hello';

    //then
    expect(() => validateBonusNumer(BONUS_NUMBER)).toThrowError(ERRORS.NOT_NUMBER);
  });

  it('bonus numbers should be 1 ~ 45', () => {
    //given
    const BONUS_NUMBER = '47';

    //then
    expect(() => validateNumberRange(BONUS_NUMBER)).toThrowError(ERRORS.NOT_IN_RANGE);
  });

  it('winning numbers should be unique', () => {
    //given
    const WINNING_NUMBER = [1, 2, 3, 4, 5, 5];
    const BONUS_NUMBER = 5;

    //then
    expect(() => validateBonusDuplicate(WINNING_NUMBER, BONUS_NUMBER)).toThrowError(
      ERRORS.NOT_BONUS_NUMBER_UNIQUE,
    );
  });
});
