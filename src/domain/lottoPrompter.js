import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { ALERT_MESSAGE, ERROR_MESSAGE } from './constants/index';

const { QUESTION_PURCHASE_AMOUNT, QUESTION_LOTTO_NUMBER, QUESTION_BONUS_NUMBER } = ALERT_MESSAGE;
const { NOT_RECEIVED_AMOUNT, NOT_RECEIVED_LOTTO_NUMBER, NOT_RECEIVED_BONUS_NUMBER } = ERROR_MESSAGE;

const readlineInterface = readline.createInterface({ input, output });

const readInputMessage = (questionMessage, errorMessage) =>
  new Promise((resolve, reject) => {
    readlineInterface.question(`${questionMessage}\n`, (inputMessage) => {
      if (inputMessage.trim()) {
        resolve(inputMessage);
      }
      reject(new Error(errorMessage));
    });
  });

export const executeReadInputPurchaseAmount = async () => {
  try {
    const amount = await readInputMessage(QUESTION_PURCHASE_AMOUNT, NOT_RECEIVED_AMOUNT);
    return amount;
  } catch (error) {
    console.error(error);
    executeReadInputPurchaseAmount();
  }
};

export const executeReadLottoNumber = async () => {
  try {
    const amount = await readInputMessage(QUESTION_LOTTO_NUMBER, NOT_RECEIVED_LOTTO_NUMBER);
    return amount;
  } catch (error) {
    console.error(error);
    return executeReadLottoNumber();
  }
};

export const executeReadBonusNumber = async () => {
  try {
    const amount = await readInputMessage(QUESTION_BONUS_NUMBER, NOT_RECEIVED_BONUS_NUMBER);
    return amount;
  } catch (error) {
    console.error(error);
    return executeReadBonusNumber();
  }
};

export const endPrompter = () => {
  readlineInterface.close();
};

export const readPurchaseAmount = async () => {
  const purchaseAmount = await executeReadInputPurchaseAmount();
  return { purchaseAmount };
};

export const readLottoNumberAndBonusNumber = async () => {
  const lottoNumber = await executeReadLottoNumber();
  const bonusNumber = await executeReadBonusNumber();
  return { lottoNumber, bonusNumber };
};
