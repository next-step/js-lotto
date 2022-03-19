export const range = (number, callback = null) =>
  Array.from({ length: number }, (_, i) => (callback ? callback(i) : i));

export const size = (array = []) => array.length;

export const validateCurry =
  (validate, initialState) =>
  (success, fail = alert) => {
    try {
      return success(validate());
    } catch (message) {
      fail(message);
      return initialState;
    }
  };
