import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import errorFallback from '../models/error/errorFallback.js';
import { ALERT_MESSAGE, ERROR_MESSAGE, APP_EXIT_KEY, APP_RETRY_KEY } from '../constants/index.js';

const { QUESTION_PURCHASE_AMOUNT, QUESTION_LOTTO_NUMBER, QUESTION_BONUS_NUMBER } = ALERT_MESSAGE;
const { NOT_RECEIVED_AMOUNT, NOT_RECEIVED_LOTTO_NUMBER, NOT_RECEIVED_BONUS_NUMBER } = ERROR_MESSAGE;

const readlineInterface = readline.createInterface({ input, output });

const validateMessage = (message) => message.trim();
const validatedAppControlKey = (message) => [APP_RETRY_KEY, APP_EXIT_KEY].includes(message);

const readInputMessage = (questionMessage, errorMessage, validator = validateMessage) =>
  new Promise((resolve, reject) => {
    readlineInterface.question(`${questionMessage}\n`, (inputMessage) => {
      if (validator(inputMessage)) {
        resolve(inputMessage);
      }

      reject(errorMessage);
    });
  });

export const executeReadInputPurchaseAmount = async () => {
  try {
    const amount = await readInputMessage(QUESTION_PURCHASE_AMOUNT, NOT_RECEIVED_AMOUNT);
    return amount;
  } catch (error) {
    errorFallback(error);
    return executeReadInputPurchaseAmount();
  }
};

export const executeReadLottoNumber = async () => {
  try {
    const winningLottoNumber = await readInputMessage(QUESTION_LOTTO_NUMBER, NOT_RECEIVED_LOTTO_NUMBER);
    return winningLottoNumber;
  } catch (error) {
    errorFallback(error);
    return executeReadLottoNumber();
  }
};

export const executeReadBonusNumber = async () => {
  try {
    const winningBonusNumber = await readInputMessage(QUESTION_BONUS_NUMBER, NOT_RECEIVED_BONUS_NUMBER);
    return winningBonusNumber;
  } catch (error) {
    errorFallback(error);
    return executeReadBonusNumber();
  }
};

export const executeReadRetryAppKey = async () => {
  try {
    const inputKey = await readInputMessage(
      ALERT_MESSAGE.RETRY_MESSAGE,
      ERROR_MESSAGE.INVALID_APP_RETRY_KEY,
      validatedAppControlKey
    );
    return inputKey;
  } catch (error) {
    errorFallback(error);
    return executeReadRetryAppKey();
  }
};

export const readPurchaseAmount = async () => {
  const purchaseAmount = await executeReadInputPurchaseAmount();
  return purchaseAmount;
};

export const readLottoNumberAndBonusNumber = async () => {
  const lottoNumber = await executeReadLottoNumber();
  const bonusNumber = await executeReadBonusNumber();
  return { lottoNumber, bonusNumber };
};

export const endPrompter = () => {
  readlineInterface.close();
};
