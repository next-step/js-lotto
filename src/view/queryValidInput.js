import {getLineInput} from './getLineInput';

export const queryValidInput = async (queryText, validate) => {
  while (true) {
    try {
      const input = await getLineInput(queryText);
      validate(input);
      return input;
    } catch (error) {
      console.log(error.message);
    }
  }
};
