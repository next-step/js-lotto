import { ERROR, LOTTO_PRICE, WINNING_NUMBER, BONUS_NUMBER } from './constants/index.js'

export const validateNumber = (number) => {
  if( typeof number !== 'number' ) {
    throw new Error(ERROR.NOT_NUMBER)
  }
} 
export const validatePrice = (number) => {
  if ( number < LOTTO_PRICE ) {
    throw new Error(ERROR.NOT_ENOUGH_PRICE)
  }
} 
export const validatePositiveNumber = (number) => {
  if ( number < 0 || Math.floor(number) !== number ) {
    throw new Error(ERROR.NOT_POSITIVE_NUMBER)
  }
}

export const validateWinningNumberCount = (number) => {
  if ( number.length < WINNING_NUMBER.COUNT ) {
    throw new Error(ERROR.NOT_ENOUGH_WINNING_NUMBER)
  }
}

export const validateBonusNumberCount = (number) => {
  if ( number.length > BONUS_NUMBER.MIN ) {
    throw new Error(ERROR.NOT_ENOUGH_BONUS_NUMBER)
  }
}

export const validateNumberRange = (numbers) => {
  numbers.forEach((number) => {
    if ( number < WINNING_NUMBER.MIN || number > WINNING_NUMBER.MAX ) {
      throw new Error(ERROR.NOT_IN_RANGE)
    }
  })
}

export const validateNumberDuplicate = (number) => {
  if ( number.length !== new Set(number).size ) {
    throw new Error(ERROR.NOT_NUMBER_UNIQUE)
  }
}

export const validateBonusDuplicate = (winningNumbers, number) => {
  if ( winningNumbers.includes(number) ) {
    throw new Error(ERROR.NOT_BONUS_NUMBER_UNIQUE)
  }
}